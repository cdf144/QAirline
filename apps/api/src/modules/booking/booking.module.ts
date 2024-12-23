import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightModule } from '../flight/flight.module';
import { TicketModule } from '../ticket/ticket.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingSchema } from './schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    TicketModule,
    FlightModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
