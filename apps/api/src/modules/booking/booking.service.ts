import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FlightService } from '../flight/flight.service';
import { TicketService } from '../ticket/ticket.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    private readonly ticketService: TicketService,
    private readonly flightService: FlightService,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().lean().exec();
  }

  async findOneById(id: string): Promise<Booking> {
    return this.findOne({ _id: id });
  }

  async findOneByCode(code: string): Promise<Booking> {
    return this.findOne({ code: code });
  }

  async findOne(filter: any): Promise<Booking> {
    return this.bookingModel
      .findOne(filter)
      .lean()
      .exec()
      .then((booking) => {
        if (!booking) {
          throw new NotFoundException(
            `Booking with ${filter._id ? `id '${filter._id}'` : `code '${filter.code}'`} not found`,
          );
        }
        return booking;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError' && filter._id) {
          throw new BadRequestException(
            `Invalid hexstring id ${filter._id} provided to find booking`,
          );
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to find booking');
      });
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    let userObjectId: Types.ObjectId;
    try {
      userObjectId = Types.ObjectId.createFromHexString(userId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException(
        `Invalid hexstring id ${userId} provided to find bookings by user`,
      );
    }

    return this.bookingModel
      .find({ userId: userObjectId })
      .lean()
      .exec()
      .catch((error) => {
        console.error(error);
        throw new InternalServerErrorException(
          'Failed to find bookings by user',
        );
      });
  }

  async countBookingsToday(): Promise<number> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const count = await this.bookingModel.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    return count;
  }

  async countBookingsThisMonth(): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    const count = await this.bookingModel.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return count;
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const code = await this.generateBookingCode();
    const userObjectId = Types.ObjectId.createFromHexString(
      createBookingDto.userId,
    );

    const newBooking = new this.bookingModel({
      code: code,
      userId: userObjectId,
      classType: createBookingDto.classType,
    });
    return (await newBooking.save()).toObject();
  }

  async deleteById(id: string): Promise<Booking> {
    return this.delete({ _id: id });
  }

  async deleteByCode(code: string): Promise<Booking> {
    return this.delete({ code: code });
  }

  async delete(filter: any): Promise<Booking> {
    return this.bookingModel
      .findOneAndDelete(filter, { returnDocument: 'before' })
      .lean()
      .exec()
      .then((booking) => {
        if (!booking) {
          throw new NotFoundException(
            `Booking with ${filter._id ? `id '${filter._id}'` : `code '${filter.code}'`} not found`,
          );
        }
        return booking;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError' && filter._id) {
          throw new BadRequestException(
            `Invalid hexstring id ${filter._id} provided to delete booking`,
          );
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to delete booking');
      });
  }

  async deleteBookingAndTickets(bookingId: string): Promise<void> {
    const bookingObjectId = Types.ObjectId.createFromHexString(bookingId);
    const tickets = await this.ticketService.findByBookingId(
      bookingObjectId.toString(),
    );

    const now = new Date();
    const twentyFourHoursFromNow = new Date(
      now.getTime() + 24 * 60 * 60 * 1000,
    );

    for (const ticket of tickets) {
      const outboundFlight = await this.flightService.findOneById(
        ticket.outboundFlightId._id.toString(),
      );
      // If flight already departed, it does not matter because there's no point in cancelling a past booking
      if (new Date(outboundFlight.departureTime) <= twentyFourHoursFromNow) {
        throw new BadRequestException(
          'Cannot cancel booking for a flight that is about to fly within 24 hours',
        );
      }

      if (ticket.returnFlightId) {
        const returnFlight = await this.flightService.findOneById(
          ticket.returnFlightId._id.toString(),
        );
        if (new Date(returnFlight.departureTime) <= twentyFourHoursFromNow) {
          throw new BadRequestException(
            'Cannot cancel booking for a flight that is about to fly within 24 hours',
          );
        }
      }
    }

    await this.ticketService.deleteByBookingId(bookingObjectId.toString());
    await this.bookingModel.findByIdAndDelete(bookingObjectId).exec();
  }

  getIdentifierType(identifier: string): 'mongoId' | 'bookingCode' | 'invalid' {
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      return 'mongoId';
    }
    if (identifier.match(/^[A-Z0-9]{8}$/)) {
      return 'bookingCode';
    }
    return 'invalid';
  }

  private async generateBookingCode(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    // Generate codes in batches to reduce the number of database queries in
    // worst cases
    const batchSize = 4;
    let code: string;

    while (true) {
      const codes = Array.from({ length: batchSize }, () =>
        Array.from({ length: 8 }, () =>
          characters.charAt(Math.floor(Math.random() * characters.length)),
        ).join(''),
      );

      const existingBookings = await this.bookingModel
        .find({ code: { $in: codes } })
        .exec();

      const existingCodes = new Set(
        existingBookings.map((booking) => booking.code),
      );
      const uniqueCodes = codes.filter((code) => !existingCodes.has(code));

      if (uniqueCodes.length > 0) {
        code = uniqueCodes[0];
        break;
      }
    }

    return code;
  }
}
