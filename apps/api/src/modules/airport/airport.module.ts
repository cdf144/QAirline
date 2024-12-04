import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';
import { Airport, AirportSchema } from './schemas/airport.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Airport.name, schema: AirportSchema }]),
  ],
  exports: [AirportService],
  providers: [AirportService],
  controllers: [AirportController],
})
export class AirportModule {}
