import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirportController } from './airport.controller';
import { Airport, AirportSchema } from './airport.schema';
import { AirportService } from './airport.service';
import { DtoModule } from './dto/dto.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Airport.name, schema: AirportSchema }]),
    DtoModule,
  ],
  exports: [AirportService],
  providers: [AirportService],
  controllers: [AirportController],
})
export class AirportModule {}
