import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DtoModule } from './dto/dto.module';
import { FlightController } from './flight.controller';
import { Flight, FlightSchema } from './flight.schema';
import { FlightService } from './flight.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
    DtoModule,
  ],
  providers: [FlightService],
  controllers: [FlightController],
})
export class FlightModule {}
