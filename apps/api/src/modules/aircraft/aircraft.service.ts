import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { Aircraft, AircraftDocument } from './schemas/aircraft.schema';

@Injectable()
export class AircraftService {
  constructor(
    @InjectModel(Aircraft.name) private aircraftModel: Model<AircraftDocument>,
  ) {}
  async createAircraft(
    createAircraftDto: CreateAircraftDto,
  ): Promise<Aircraft> {
    const newAircraft = new this.aircraftModel({
      manufacturer: createAircraftDto.manufacturer,
      model: createAircraftDto.model,
      totalSeat: createAircraftDto.totalSeat,
      economySeat: createAircraftDto.economySeat,
      businessSeat: createAircraftDto.businessSeat,
    });
    return (await newAircraft.save()).toObject();
  }

  async findAll(): Promise<Aircraft[]> {
    return this.aircraftModel.find().lean().exec();
  }

  async findOneById(id: string): Promise<Aircraft> {
    return this.aircraftModel
      .findById(id)
      .lean()
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
        throw new InternalServerErrorException('Failed to find aircraft');
      });
  }
}
