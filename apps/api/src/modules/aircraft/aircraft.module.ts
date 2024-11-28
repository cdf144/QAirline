import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AircraftController } from './aircraft.controller';
import { Aircraft, AircraftSchema } from './aircraft.schema';
import { AircraftService } from './aircraft.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Aircraft.name, schema: AircraftSchema },
    ]),
  ],
  providers: [AircraftService],
  controllers: [AircraftController],
  exports: [AircraftService],
})
export class AircraftModule {}
