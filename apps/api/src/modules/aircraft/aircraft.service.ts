import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aircraft, AircraftDocument } from './aircraft.schema';

@Injectable()
export class AircraftService {
  constructor(
    @InjectModel(Aircraft.name) private aircraftModel: Model<AircraftDocument>,
  ) {}
  async createAircraft(aircraftData: Partial<Aircraft>): Promise<Aircraft> {
    const newAircraft = await this.aircraftModel.create(aircraftData);
    return newAircraft.save();
  }

  async getAllAircraft(): Promise<Aircraft[]> {
    return this.aircraftModel.find().exec();
  }

  async getAircraftById(id: string): Promise<Aircraft> {
    return this.aircraftModel.findOne({ _id: id }).exec();
  }
}
