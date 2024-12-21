import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketModule } from '../ticket/ticket.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingSchema } from './schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    TicketModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
