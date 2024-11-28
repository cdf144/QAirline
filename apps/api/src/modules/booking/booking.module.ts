import { Module } from '@nestjs/common';
import { FlightService } from '../flight/flight.service';
import { TicketService } from '../ticket/ticket.service';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, FlightService, TicketService],
})
export class BookingModule {}
