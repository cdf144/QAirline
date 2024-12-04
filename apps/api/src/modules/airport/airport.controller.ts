import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AirportService } from './airport.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { Airport } from './schemas/airport.schema';

@Controller('airport')
export class AirportController {
  constructor(private airportService: AirportService) {}

  //Tạo một sân bay mới
  @Post()
  async createAirport(
    @Body() createAirportDto: CreateAirportDto,
  ): Promise<Airport> {
    return this.airportService.createAirport(createAirportDto);
  }
  //Lấy các tàu bay
  @Get()
  async getAllAirport(): Promise<Airport[]> {
    return this.airportService.getAllAirport();
  }
  //Lấy một tàu bay
  @Get(':code')
  async getAirportByCode(@Param('code') code: number): Promise<Airport> {
    return this.airportService.getAirportByCode(code);
  }
}
