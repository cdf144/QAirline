import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { COOKIE_NAMES } from 'src/common/constants';
import { ConditionalApiCookieAuth } from 'src/common/decorators/conditional-api-cookie-auth.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { AircraftService } from './aircraft.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';

@ApiTags('aircraft')
@ConditionalApiCookieAuth(COOKIE_NAMES.ACCESS_TOKEN)
@Controller('v1/aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  @Post()
  async create(
    @Res() res: FastifyReply,
    @Body() createAircraftDto: CreateAircraftDto,
  ): Promise<void> {
    const newAircraft = await this.aircraftService.create(createAircraftDto);
    res.send(newAircraft);
  }

  @Public()
  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const aircrafts = await this.aircraftService.findAll();
    res.send(aircrafts);
  }

  @Public()
  @Get(':id')
  async findOne(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const aircraft = await this.aircraftService.findOne(id);
    res.send(aircraft);
  }
}
