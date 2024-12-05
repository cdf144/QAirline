import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll(): Promise<Aircraft[]> {
    return this.aircraftModel.find().exec();
  }

  async findOneById(id: string): Promise<Aircraft> {
    return this.aircraftModel
      .findById(id)
      .exec()
      .then((aircraft) => {
        if (!aircraft) {
          throw new NotFoundException(`Aircraft with id '${id}' not found`);
        }
        return aircraft;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError') {
          throw new BadRequestException(
            `Invalid hexstring id '${id}' provided to find aircraft`,
          );
        }
        console.error(error);
        throw new NotFoundException('Failed to find aircraft');
      });
  }
}
