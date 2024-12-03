import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AircraftModule } from '../aircraft/aircraft.module';
import { TicketController } from './ticket.controller';
import { Ticket, TicketSchema } from './ticket.schema';
import { TicketService } from './ticket.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    AircraftModule,
  ],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}