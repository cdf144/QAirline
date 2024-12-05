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
import { AircraftService } from './aircraft.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';

@ApiTags('aircraft')
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
  async createAircraft(
    @Res() res: FastifyReply,
    @Body() createAircraftDto: CreateAircraftDto,
  ): Promise<void> {
    const newAircraft =
      await this.aircraftService.createAircraft(createAircraftDto);
    res.send(newAircraft);
  }

  @Get()
  @ApiOkResponse({ description: 'Aircrafts found' })
  @ApiInternalServerErrorResponse({
    description: 'Failed to find aircrafts due to server error',
  })
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const aircrafts = await this.aircraftService.findAll();
    res.send(aircrafts);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Aircraft found' })
  @ApiBadRequestResponse({
    description: 'Invalid hexstring id provided to find aircraft',
  })
  @ApiNotFoundResponse({ description: 'Aircraft with specified id not found' })
  @ApiInternalServerErrorResponse({
    description: 'Failed to find aircraft due to server error',
  })
  async findOneById(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const aircraft = await this.aircraftService.findOneById(id);
    res.send(aircraft);
  }
}
