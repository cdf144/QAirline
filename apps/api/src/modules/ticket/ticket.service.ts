import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument, TicketStatus } from './schemas/ticket.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    // TODO: Validate return flight id if trip type is round trip
    const bookingObjectId = Types.ObjectId.createFromHexString(
      createTicketDto.bookingId,
    );
    const outboundFlightObjectId = Types.ObjectId.createFromHexString(
      createTicketDto.outboundFlightId,
    );
    const returnFlightObjectId = createTicketDto.returnFlightId
      ? Types.ObjectId.createFromHexString(createTicketDto.returnFlightId)
      : null;

    const newTicket = new this.ticketModel({
      bookingId: bookingObjectId,
      tripType: createTicketDto.tripType,
      outboundFlightId: outboundFlightObjectId,
      returnFlightId: returnFlightObjectId,
      seat: createTicketDto.seat,
      status: createTicketDto.status
        ? createTicketDto.status
        : TicketStatus.Pending,
      totalPrice: Types.Decimal128.fromString(createTicketDto.totalPrice),
    });

    return newTicket.save();
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec();
  }

  async findOne(id: string): Promise<Ticket> {
    return this.ticketModel
      .findById(id)
      .exec()
      .then((ticket) => {
        if (!ticket) {
          throw new NotFoundException(`Ticket with id '${id}' not found`);
        }
        return ticket;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError') {
          throw new BadRequestException(
            `Invalid hexstring id ${id} provided to find ticket`,
          );
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to find ticket');
      });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    const { status, totalPrice } = updateTicketDto;

    if (status) {
      ticket.status = status;
    }
    if (totalPrice) {
      ticket.totalPrice = Types.Decimal128.fromString(totalPrice);
    }

    return this.ticketModel.findByIdAndUpdate(id, ticket, { new: true }).exec();
  }

  async delete(id: string): Promise<Ticket> {
    // TODO: Perform validation to prevent ticket cannot be deleted if departure time is less than 24 hours
    return this.ticketModel
      .findByIdAndDelete(id)
      .exec()
      .then((ticket) => {
        if (!ticket) {
          throw new NotFoundException(`Ticket with id '${id}' not found`);
        }
        return ticket;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError') {
          throw new BadRequestException(
            `Invalid hexstring id ${id} provided to delete ticket`,
          );
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to delete ticket');
      });
  }

  async findAllPending(): Promise<Ticket[]> {
    return this.ticketModel.find({ status: TicketStatus.Pending }).exec();
  }
}
