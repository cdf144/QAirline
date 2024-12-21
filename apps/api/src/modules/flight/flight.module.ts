import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { Flight, FlightSchema } from './schemas/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
  ],
  providers: [FlightService],
  controllers: [FlightController],
  exports: [FlightService],
})
export class FlightModule {}
