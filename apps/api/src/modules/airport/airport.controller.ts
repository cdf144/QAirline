import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { AirportService } from './airport.service';
import { CreateAirportDto } from './dto/create-airport.dto';

@ApiTags('airport')
@Controller('v1/airport')
export class AirportController {
  constructor(private airportService: AirportService) {}

  @Post()
  async create(
    @Res() res: FastifyReply,
    @Body() createAirportDto: CreateAirportDto,
  ): Promise<void> {
    const newAirport = await this.airportService.create(createAirportDto);
    res.send(newAirport);
  }
  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const airports = await this.airportService.findAll();
    res.send(airports);
  }
  @Get(':id')
  async findOneById(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const airport = await this.airportService.findOneById(id);
    res.send(airport);
  }

  @Get('code/:code')
  async findOneByCode(
    @Res() res: FastifyReply,
    @Param('code') code: string,
  ): Promise<void> {
    const airport = await this.airportService.findOneByCode(code);
    res.send(airport);
  }
}
