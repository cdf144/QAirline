import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { FlightFindDto } from './dto/find-flight.dto';
import { FlightService } from './flight.service';
import { Flight } from './schemas/flight.schema';

@Controller('flight')
export class FlightController {
  constructor(private FlightService: FlightService) {}
  //Tìm các chuyến bay từ điểm này sang điểm kia trong các thời gian đã chọn
  @Get()
  async getFlight(@Query() flightFindDto: FlightFindDto): Promise<Flight[]> {
    return this.FlightService.getFlight(flightFindDto);
  }

  @Get('/all')
  //Lấy tất cả các chuyến bay
  async getAllFlight(): Promise<Flight[]> {
    return this.FlightService.getAllFlights();
  }
  //Nhập dữ liệu các chuyến bay
  @Post()
  async createFlight(
    @Body() createFlightDto: CreateFlightDto,
  ): Promise<{ message: string }> {
    this.FlightService.createFlight(createFlightDto);
    return { message: 'Flight created successfully' };
  }

  //Thay đổi thời gian bay
  @Post(':id/change-time')
  async changeFlightDepartureTime(date: Date, id: string) {
    this.FlightService.changeFlightTime(date, id);
  }
}
