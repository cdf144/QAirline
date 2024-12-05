import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AircraftService } from './aircraft.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';

@Controller('v1/aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  @Post()
  async createAircraft(
    @Res() res: FastifyReply,
    @Body() createAircraftDto: CreateAircraftDto,
  ): Promise<void> {
    const newAircraft =
      await this.aircraftService.createAircraft(createAircraftDto);
    res.send(newAircraft);
  }

  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const aircraft = await this.aircraftService.findAll();
    res.send(aircraft);
  }

  @Get(':id')
  async findOneById(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const aircraft = await this.aircraftService.findOneById(id);
    res.send(aircraft);
  }
}
