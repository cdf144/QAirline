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
    @Param('userEmail') userEmail: string,
  ): Promise<Ticket> {
    return this.ticketService.getTicketById(id, userEmail);
  }

  //Huỷ vé
  @Delete(':id')
  async cancelTicket(
    @Param('id') id: string,
    @Query('userEmail') userEmail: string,
  ): Promise<{ message: string }> {
    const message = await this.ticketService.cancelTicket(id, userEmail);
    return message;
  }
}
