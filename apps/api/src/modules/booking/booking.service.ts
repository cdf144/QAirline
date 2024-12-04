import { Injectable } from '@nestjs/common';
import { Status } from '../ticket/schemas/ticket.schema';
import { TicketService } from './../ticket/ticket.service';

@Injectable()
export class BookingService {
  constructor(private ticketService: TicketService) {}
  //Confirm that the user booked so all the tickets becomes "Confirmed"
  //Đặt vé
  async book(): Promise<{ message: string }> {
    const tickets = await this.ticketService.getPendingTicket();
    await Promise.all(
      tickets.map((ticket) => (ticket.status = Status.Confirmed)),
    );
    return { message: 'Booking successfully' };
  }
}
