import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AircraftService } from '../aircraft/aircraft.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import {
  ClassType,
  Status,
  Ticket,
  TicketDocument,
} from './schemas/ticket.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    private aircraftService: AircraftService,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    // Create a ticket after find flight in Vietnam Airlines
    // Đặt vé ban đầu, đưa vé vào giỏ hàng
    const newTicket = new this.ticketModel({
      ...createTicketDto,
      status: Status.Pending,
    });
    return newTicket.save();
  }
  //Xem các vé đã đặt của nguời dùng
  async getAllTickets(userEmail: string): Promise<Ticket[]> {
    return this.ticketModel.find({ userEmail }).exec();
  }
  //Xem chi tiết vé theo id, lưu id ở bên fronend
  async getTicketById(id: string, userEmail: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).exec();

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    if (ticket.userEmail !== userEmail) {
      throw new ForbiddenException(
        'You are not authorized to view this ticket',
      );
    }
    return ticket;
  }
  //Huỷ vé máy bay nhưng phải trước một ngày
  async cancelTicket(id: string, userId: string): Promise<{ message: string }> {
    const ticket = await this.ticketModel.findOne({ _id: id, userId }).exec();
    if (
      ticket &&
      new Date(ticket.departureTime).getTime() - new Date().getTime() < 86400000
    ) {
      return { message: 'Cannot cancel ticket within 1 day' };
    }
    await ticket.deleteOne();
    return { message: 'Ticket canceled successfully' };
  }

  //Xem các vé được đưa vào giỏ hàng
  async getPendingTicket(): Promise<Ticket[]> {
    return this.ticketModel.find({ status: Status.Pending }).exec();
  }

  async getNumberOfEconomyTicket(outBoundFlightId: number): Promise<number> {
    return await this.ticketModel
      .find({
        outBoundFlightId: outBoundFlightId,
        classType: ClassType.Economy,
      })
      .countDocuments();
  }

  async getNumberOfBusinessTicket(outBoundFlightId: number): Promise<number> {
    return await this.ticketModel
      .find({
        outBoundFlightId: outBoundFlightId,
        classType: ClassType.Business,
      })
      .countDocuments();
  }
}
