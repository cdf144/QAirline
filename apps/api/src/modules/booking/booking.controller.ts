import { Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async book() {
    const bookingMessage = this.bookingService.book();
    return bookingMessage;
  }
}
