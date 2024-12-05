import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aircraft, AircraftDocument } from './schemas/aircraft.schema';

@Injectable()
export class AircraftService {
  constructor(
    @InjectModel(Aircraft.name) private aircraftModel: Model<AircraftDocument>,
  ) {}
  async createAircraft(aircraftData: Partial<Aircraft>): Promise<Aircraft> {
    const newAircraft = new this.aircraftModel(aircraftData);
    return newAircraft.save();
  }

  async getAllAircraft(): Promise<Aircraft[]> {
    return this.aircraftModel.find().exec();
  }

  async getAircraftById(id: string): Promise<Aircraft> {
    return this.aircraftModel
      .findOne({ _id: id })
      .exec()
      .then((aircraft) => {
        if (!aircraft) {
          throw new NotFoundException(`Aircraft with id ${id} not found`);
        }
        return aircraft;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        console.error(error);
        throw new NotFoundException('Failed to find aircraft');
      });
  }
}
