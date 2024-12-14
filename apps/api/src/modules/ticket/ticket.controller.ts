import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';

@ApiTags('ticket')
@Controller('v1/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  @Post()
  async create(
    @Res() res: FastifyReply,
    @Body() createTicketDto: CreateTicketDto,
  ): Promise<void> {
    const newTicket = await this.ticketService.create(createTicketDto);
    res.send(newTicket);
  }

  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const tickets = await this.ticketService.findAll();
    res.send(tickets);
  }

  @Get(':id')
  async findOne(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const ticket = await this.ticketService.findOne(id);
    res.send(ticket);
  }

  @Patch(':id')
  async update(
    @Res() res: FastifyReply,
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<void> {
    const updatedTicket = await this.ticketService.update(id, updateTicketDto);
    res.send(updatedTicket);
  }

  @Delete(':id')
  async delete(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const deletedTicket = await this.ticketService.delete(id);
    res.send(deletedTicket);
  }
}
