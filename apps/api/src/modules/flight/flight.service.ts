import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight, FlightDocument } from './schemas/flight.schema';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
  ) {}

  async findAll(): Promise<Flight[]> {
    return this.flightModel.find().lean().exec();
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
      .lean()
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
        this.handleFindErrors(error, filter);
        console.error(error);
        throw new InternalServerErrorException('Failed to find flight');
      });
  }

  async create(createFlightDto: CreateFlightDto) {
    const code = await this.generateUniqueCode();
    const aircraftObjectId = Types.ObjectId.createFromHexString(
      createFlightDto.aircraftId,
    );
    const departureAirportObjectId = Types.ObjectId.createFromHexString(
      createFlightDto.departureAirportId,
    );
    const destinationAirportObjectId = Types.ObjectId.createFromHexString(
      createFlightDto.destinationAirportId,
    );

    const newFlight = new this.flightModel({
      code: code,
      aircraftId: aircraftObjectId,
      departureAirportId: departureAirportObjectId,
      destinationAirportId: destinationAirportObjectId,
      departureTime: createFlightDto.departureTime,
      arrivalTime: createFlightDto.arrivalTime,
      status: createFlightDto.status,
      price: Types.Decimal128.fromString(createFlightDto.price),
    });

    return (await newFlight.save()).toObject();
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
    filter: FilterQuery<FlightDocument>,
    updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    const flight = await this.findOne(filter);
    const {
      departureTime: newDepartureTime,
      arrivalTime: newArrivalTime,
      status: newStatus,
      price: newPrice,
    } = updateFlightDto;

    if (newDepartureTime) {
      const parsedNewDepartureTime = new Date(newDepartureTime);
      if (newArrivalTime) {
        if (parsedNewDepartureTime > new Date(newArrivalTime)) {
          throw new BadRequestException(
            'New departure time cannot be later than new arrival time',
          );
        }
      } else if (parsedNewDepartureTime > flight.arrivalTime) {
        throw new BadRequestException(
          'New departure time cannot be later than old arrival time',
        );
      }
      flight.departureTime = parsedNewDepartureTime;
    }

    if (newArrivalTime) {
      const parsedNewArrivalTime = new Date(newArrivalTime);
      if (parsedNewArrivalTime < flight.departureTime) {
        throw new BadRequestException(
          `New arrival time cannot be earlier than old departure time`,
        );
      }
      flight.arrivalTime = parsedNewArrivalTime;
    }

    if (newStatus) {
      flight.status = newStatus;
    }

    if (newPrice) {
      flight.price = Types.Decimal128.fromString(newPrice);
    }

    return this.flightModel
      .findOneAndUpdate(filter, flight, { new: true })
      .lean()
      .exec();
  }

  async deleteById(id: string): Promise<Flight> {
    return this.delete({ _id: id });
  }

  async deleteByCode(code: string): Promise<Flight> {
    return this.delete({ code: code });
  }

  private async delete(filter: FilterQuery<FlightDocument>): Promise<Flight> {
    return this.flightModel
      .findOneAndDelete(filter, { returnDocument: 'before' })
      .lean()
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
        this.handleFindErrors(error, filter);
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

  /**
   * Handles common errors that occur during the find operation for flights.
   *
   * @param error - The error that was thrown during the find operation.
   * @param filter - An optional filter query used to find the flight document.
   * @throws NotFoundException - If the error is an instance of NotFoundException.
   * @throws BadRequestException - If the error is a CastError and the filter contains an invalid hexstring id.
   */
  private handleFindErrors(error: Error, filter?: FilterQuery<FlightDocument>) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    if (error.name === 'CastError' && filter?._id) {
      throw new BadRequestException(
        `Invalid hexstring id ${filter._id} provided to find flight`,
      );
    }
  }

  private async generateUniqueCode(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code: string;
    let isUnique = false;

    while (!isUnique) {
      code = Array.from({ length: 5 }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length)),
      ).join('');

      const existingFlight = await this.flightModel
        .findOne({ code: code })
        .exec();
      if (!existingFlight) {
        isUnique = true;
      }
    }

    return code;
  }
}
