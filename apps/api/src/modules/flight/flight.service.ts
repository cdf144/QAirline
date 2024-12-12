import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight, FlightDocument } from './schemas/flight.schema';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
  ) {}

  async findAll(): Promise<Flight[]> {
    return this.flightModel.find().exec();
  }

  async findOneById(id: string): Promise<Flight> {
    return this.findOne({ _id: id });
  }

  async findOneByCode(code: string): Promise<Flight> {
    return this.findOne({ code: code });
  }

  private async findOne(filter: any): Promise<Flight> {
    return this.flightModel
      .findOne(filter)
      .exec()
      .then((flight) => {
        if (!flight) {
          throw new NotFoundException(
            `Flight with ${filter._id ? `id '${filter._id}'` : `code '${filter.code}'`} not found`,
          );
        }
        return flight;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError' && filter._id) {
          throw new BadRequestException(
            `Invalid hexstring id ${filter._id} provided to find flight`,
          );
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to find flight');
      });
  }

  async create(createFlightDto: CreateFlightDto) {
    const code = await this.generateUniqueCode();

    const newFlight = new this.flightModel({
      code: code,
      aircraftId: createFlightDto.aircraftId,
      departureAirportId: createFlightDto.departureAirportId,
      destinationAirportId: createFlightDto.destinationAirportId,
      departureTime: createFlightDto.departureTime,
      arrivalTime: createFlightDto.arrivalTime,
      status: createFlightDto.status,
      price: Types.Decimal128.fromString(createFlightDto.price),
    });

    return newFlight.save();
  }

  async updateById(
    id: string,
    updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    return this.update({ _id: id }, updateFlightDto);
  }

  async updateByCode(
    code: string,
    updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    return this.update({ code: code }, updateFlightDto);
  }

  private async update(
    filter: any,
    updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    const flight = await this.findOne(filter);
    const { departureTime, arrivalTime, status, price } = updateFlightDto;

    if (departureTime) {
      const newDepartureTime = new Date(departureTime);
      if (arrivalTime && newDepartureTime > new Date(arrivalTime)) {
        throw new BadRequestException(
          'New departure time cannot be later than new arrival time',
        );
      } else if (newDepartureTime > flight.arrivalTime) {
        throw new BadRequestException(
          'New departure time cannot be later than old arrival time',
        );
      }
      flight.departureTime = newDepartureTime;
    }

    if (arrivalTime) {
      const newArrivalTime = new Date(arrivalTime);
      if (newArrivalTime < flight.departureTime) {
        throw new BadRequestException(
          `New arrival time cannot be earlier than old departure time`,
        );
      }
      flight.arrivalTime = newArrivalTime;
    }

    if (status) {
      flight.status = status;
    }

    if (price) {
      flight.price = Types.Decimal128.fromString(price);
    }

    return this.flightModel
      .findOneAndUpdate(filter, flight, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<Flight> {
    return this.delete({ _id: id });
  }

  async deleteByCode(code: string): Promise<Flight> {
    return this.delete({ code: code });
  }

  private async delete(filter: any): Promise<Flight> {
    return this.flightModel
      .findOneAndDelete(filter, { returnDocument: 'before' })
      .exec()
      .then((flight) => {
        if (!flight) {
          throw new NotFoundException(
            `Flight with ${
              filter._id ? `id '${filter._id}'` : `code '${filter.code}'`
            } not found`,
          );
        }
        return flight;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError' && filter._id) {
          throw new BadRequestException(
            `Invalid hexstring id '${filter._id}' provided to delete flight`,
          );
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to delete flight');
      });
  }

  getIdentifierType(identifier: string): 'mongoId' | 'flightCode' | 'invalid' {
    if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
      return 'mongoId';
    } else if (/^[A-Z0-9]{5}$/.test(identifier)) {
      return 'flightCode';
    }
    return 'invalid';
  }

  private async generateUniqueCode(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code: string;
    let isUnique = false;

    while (!isUnique) {
      code = Array.from({ length: 5 }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length)),
      ).join('');

      const existingFlight = await this.flightModel.findOne({ code }).exec();
      if (!existingFlight) {
        isUnique = true;
      }
    }

    return code;
  }
}
