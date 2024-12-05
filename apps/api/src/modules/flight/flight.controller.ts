import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightService } from './flight.service';

@ApiTags('flight')
@Controller('v1/flight')
export class FlightController {
  constructor(private flightService: FlightService) {}
  // TODO: Implement GET /search API for searching flights by departure and destination airports, departure time, and price range
  // TODO: Add Swagger Response documentation decorators

  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const flights = await this.flightService.findAll();
    res.send(flights);
  }

  @Get(':id')
  async findOne(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const flight = await this.flightService.findOneById(id);
    res.send(flight);
  }

  @Post()
  async create(
    @Res() res: FastifyReply,
    @Body() createFlightDto: CreateFlightDto,
  ): Promise<void> {
    const newFlight = await this.flightService.create(createFlightDto);
    res.send(newFlight);
  }

  @Patch(':id')
  async update(
    @Res() res: FastifyReply,
    @Param('id') id: string,
    @Body()
    updateFlightDto: UpdateFlightDto,
  ): Promise<void> {
    const updatedFlight = await this.flightService.update(id, updateFlightDto);
    res.send(updatedFlight);
  }

  @Delete(':id')
  async delete(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const deletedFlight = await this.flightService.delete(id);
    res.send(deletedFlight);
  }
}
