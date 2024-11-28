import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFlightDto } from './dto/create-flight.dto';
import { FlightFindDto } from './dto/find-flight.dto';
import { Flight, FlightDocument } from './flight.schema';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
  ) {}
  async getFlight(FlightFindDto: FlightFindDto): Promise<Flight[]> {
    const { departure, arrival, fromDate, endDate } = FlightFindDto;
    const flights = await this.flightModel
      .find({
        departure,
        arrival,
        date: {
          $gte: new Date(fromDate),
          $lte: new Date(endDate),
        },
      })
      .exec();
    return flights;
  }

  async getAllFlights(): Promise<Flight[]> {
    return this.flightModel.find().exec();
  }
  async createFlight(createFlightDto: CreateFlightDto) {
    const newFlight = await this.flightModel.create(createFlightDto);
    return newFlight.save();
  }

  async changeFlightTime(changeFlightTime: Date, id: string) {
    const flight = await this.flightModel
      .findByIdAndUpdate(id, { dayFlight: changeFlightTime })
      .exec();
    return flight;
  }
}
