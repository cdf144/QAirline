import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiCreatedResponse({ description: 'Aircraft created' })
  @ApiBadRequestResponse({
    description: 'Invalid attribute(s) provided to create aircraft',
  })
  @ApiInternalServerErrorResponse({
    description: 'Failed to create aircraft due to server error',
  })
  async create(
    @Res() res: FastifyReply,
    @Body() createAircraftDto: CreateAircraftDto,
  ): Promise<void> {
    const newAircraft = await this.aircraftService.create(createAircraftDto);
    res.send(newAircraft);
  }

  @Public()
  @Get()
  @ApiOkResponse({ description: 'Aircrafts found' })
  @ApiInternalServerErrorResponse({
    description: 'Failed to find aircrafts due to server error',
  })
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const aircrafts = await this.aircraftService.findAll();
    res.send(aircrafts);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ description: 'Aircraft found' })
  @ApiBadRequestResponse({
    description: 'Invalid hexstring id provided to find aircraft',
  })
  @ApiNotFoundResponse({ description: 'Aircraft with specified id not found' })
  @ApiInternalServerErrorResponse({
    description: 'Failed to find aircraft due to server error',
  })
  async findOne(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const aircraft = await this.aircraftService.findOne(id);
    res.send(aircraft);
  }
}
