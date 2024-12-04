import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Airport, AirportDocument } from './schemas/airport.schema';

@Injectable()
export class AirportService {
  constructor(
    @InjectModel(Airport.name) private airportModel: Model<AirportDocument>,
  ) {}
  async createAirport(airportData: Partial<Airport>): Promise<Airport> {
    const newAirport = await this.airportModel.create(airportData);
    return newAirport.save();
  }

  async getAllAirport(): Promise<Airport[]> {
    return this.airportModel.find().exec();
  }

  async getAirportByCode(code: number): Promise<Airport> {
    return this.airportModel.findOne({ code: code });
  }
}
