import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Aircraft } from './aircraft.schema';
import { AircraftService } from './aircraft.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';

@Controller('aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  @Post()
  //Tạo các tàu bay mới
  async createAircraft(
    @Body() createAircraftDto: CreateAircraftDto,
  ): Promise<Aircraft> {
    return this.aircraftService.createAircraft(createAircraftDto);
  }
  //Lấy các tàu bay với code
  @Get(':id')
  async getAircraftByCode(@Param('id') _id: string): Promise<Aircraft> {
    return this.aircraftService.getAircraftById(_id);
  }
}
