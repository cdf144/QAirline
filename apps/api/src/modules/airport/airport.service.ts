import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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
    return this.findOne({ _id: id });
  }

  async findOneByCode(code: string): Promise<Airport> {
    return this.findOne({ code: code });
  }

  async findOne(filter: FilterQuery<Airport>): Promise<Airport> {
    return this.airportModel
      .findOne(filter)
      .lean()
      .exec()
      .then((airport) => {
        if (!airport) {
          throw new NotFoundException(
            `Airport with ${filter._id ? `id '${filter._id}'` : `code '${filter.code}'`} not found`,
          );
        }
        return airport;
      })
      .catch((error) => {
        this.handleFindErrors(error, filter);
        console.error(error);
        throw new InternalServerErrorException('Failed to find airport');
      });
  }

  private handleFindErrors(error: any, filter: FilterQuery<AirportDocument>) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    if (error.name === 'CastError') {
      throw new BadRequestException(
        `Invalid hexstring id '${filter._id}' provided to find airport`,
      );
    }
  }

  getIdentifierType(identifier: string): 'mongoId' | 'code' | 'invalid' {
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      return 'mongoId';
    } else if (vietnamAirportIataList[identifier]) {
      return 'code';
    }
    return 'invalid';
  }
}
