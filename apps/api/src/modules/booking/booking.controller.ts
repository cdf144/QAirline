import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { COOKIE_NAMES } from 'src/common/constants';
import { ConditionalApiCookieAuth } from 'src/common/decorators/conditional-api-cookie-auth.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { TicketService } from '../ticket/ticket.service';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';

const INVALID_IDENTIFIER_MESSAGE =
  'Invalid identifier provided. Must be a valid 24-character hexadecimal string, or a valid 8-character booking code consisting of uppercase letters and digits';

@ApiTags('booking')
@ConditionalApiCookieAuth(COOKIE_NAMES.ACCESS_TOKEN)
@Controller('v1/booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly ticketService: TicketService,
  ) {}
  // TODO: Update booking?

  @Roles(Role.Admin)
  @Get()
  async findAll() {
    const bookings = await this.bookingService.findAll();
    return bookings;
  }

  @Get(':identifier')
  async findOne(
    @Res() res: FastifyReply,
    @Param('identifier') identifier: string,
  ) {
    const identifierType = this.bookingService.getIdentifierType(identifier);
    let booking: Booking;

    switch (identifierType) {
      case 'mongoId':
        booking = await this.bookingService.findOneById(identifier);
        break;
      case 'bookingCode':
        booking = await this.bookingService.findOneByCode(identifier);
        break;
      default:
        throw new BadRequestException(INVALID_IDENTIFIER_MESSAGE);
    }

    res.send(booking);
  }

  @Get('user/:userId')
  async findUserBookings(
    @Res() res: FastifyReply,
    @Param('userId') userId: string,
  ) {
    const bookings = await this.bookingService.findByUserId(userId);
    const bookingsWithTickets = await Promise.all(
      bookings.map(async (booking) => {
        const tickets = await this.ticketService.findByBookingId(
          booking._id.toString(),
        );
        return {
          ...booking,
          tickets: tickets.map((ticket) => ({
            seat: ticket.seat,
            outboundFlightId: ticket.outboundFlightId,
            returnFlightId: ticket.returnFlightId,
          })),
        };
      }),
    );
    res.send(bookingsWithTickets);
  }

  @Roles(Role.Admin)
  @Get('stats/today')
  async countBookingsToday() {
    const count = await this.bookingService.countBookingsToday();
    return { count };
  }

  @Roles(Role.Admin)
  @Get('stats/this-month')
  async countBookingsThisMonth() {
    const count = await this.bookingService.countBookingsThisMonth();
    return { count };
  }

  @Post()
  async create(
    @Res() res: FastifyReply,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    const newBooking = await this.bookingService.create(createBookingDto);
    res.send(newBooking);
  }

  @Delete(':identifier')
  async remove(
    @Res() res: FastifyReply,
    @Param('identifier') identifier: string,
  ) {
    const identifierType = this.bookingService.getIdentifierType(identifier);
    let deletedBooking: Booking;

    switch (identifierType) {
      case 'mongoId':
        deletedBooking = await this.bookingService.deleteById(identifier);
        break;
      case 'bookingCode':
        deletedBooking = await this.bookingService.deleteByCode(identifier);
        break;
      default:
        throw new BadRequestException(INVALID_IDENTIFIER_MESSAGE);
    }

    res.send(deletedBooking);
  }

  @Delete('user/:bookingId')
  async deleteBookingAndTickets(
    @Res() res: FastifyReply,
    @Param('bookingId') bookingId: string,
  ) {
    await this.bookingService.deleteBookingAndTickets(bookingId);
    res.send({
      message: 'Booking and associated tickets deleted successfully',
    });
  }
}
