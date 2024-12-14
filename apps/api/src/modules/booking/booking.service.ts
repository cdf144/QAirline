import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
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
    return newBooking.save();
  }

  async deleteById(id: string): Promise<Booking> {
    return this.delete({ _id: id });
  }

  async deleteByCode(code: string): Promise<Booking> {
    return this.delete({ code: code });
  }

  async delete(filter: any): Promise<Booking> {
    return this.bookingModel
      .findOneAndDelete(filter)
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
