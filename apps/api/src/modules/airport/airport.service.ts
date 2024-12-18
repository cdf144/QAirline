import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { vietnamAirportIataList } from 'src/common/lists/vietnam-airport-iata.list';
import { CreateAirportDto } from './dto/create-airport.dto';
import { Airport, AirportDocument } from './schemas/airport.schema';

@Injectable()
export class AirportService {
  constructor(
    @InjectModel(Airport.name) private airportModel: Model<AirportDocument>,
  ) {}

  async create(createAirportDto: CreateAirportDto): Promise<Airport> {
    const existingAirport = await this.airportModel.findOne({
      code: createAirportDto.code,
    });
    if (existingAirport) {
      throw new BadRequestException(
        `Airport with code '${createAirportDto.code}' already exists`,
      );
    }
    const newAirport = new this.airportModel({
      code: createAirportDto.code,
      city: vietnamAirportIataList[createAirportDto.code],
    });
    return (await newAirport.save()).toObject();
  }

  async findAll(): Promise<Airport[]> {
    return this.airportModel.find().lean().exec();
  }

  async findOneById(id: string): Promise<Airport> {
    return this.airportModel
      .findById(id)
      .lean()
      .exec()
      .then((airport) => {
        if (!airport) {
          throw new NotFoundException(`Airport with id '${id}' not found`);
        }
        return airport;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError') {
          throw new BadRequestException(
            `Invalid hexstring id '${id}' provided to find airport`,
          );
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to find airport');
      });
  }

  async findOneByCode(code: string): Promise<Airport> {
    if (!vietnamAirportIataList[code]) {
      throw new BadRequestException(`Invalid Vietnam airport code '${code}'`);
    }
    return this.airportModel
      .findOne({ code: code })
      .lean()
      .exec()
      .then((airport) => {
        if (!airport) {
          throw new NotFoundException(`Airport with code '${code}' not found`);
        }
        return airport;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to find airport');
      });
  }
}
