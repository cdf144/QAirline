import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './ticket.schema';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  //create a new ticket but not confirmed yet.
  @Post('create')
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
  ): Promise<{ message: string }> {
    await this.ticketService.createTicket(createTicketDto);
    return { message: 'Ticket created successfully' };
  }

  @Get()
  async getAllTickets(
    @Query('userEmail') userEmail: string,
  ): Promise<Ticket[]> {
    return this.ticketService.getAllTickets(userEmail);
  }

  @Get(':id')
  async getTicketById(
    @Param('id') id: string,
    @Query('userEmail') userEmail: string,
  ): Promise<Ticket> {
    return this.ticketService.getTicketById(id, userEmail);
  }

  //Huỷ vé
  @Delete(':id')
  async cancelTicket(
    @Query('userEmail') userEmail: string,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return this.ticketService.cancelTicket(id, userEmail);
  }
}
