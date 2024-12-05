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
    return this.flightModel
      .findById(id)
      .exec()
      .then((flight) => {
        if (!flight) {
          throw new NotFoundException(`Flight with id '${id}' not found`);
        }
        return flight;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError') {
          throw new BadRequestException(
            `Invalid hexstring id '${id}' provided to find flight`,
          );
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to find aircraft');
      });
  }

  async create(createFlightDto: CreateFlightDto) {
    const newFlight = new this.flightModel({
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

  async update(id: string, updateFlightDto: UpdateFlightDto) {
    const flight = await this.findOneById(id);

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

    return this.flightModel.findByIdAndUpdate(id, flight, { new: true }).exec();
  }

  async delete(id: string): Promise<Flight> {
    return this.flightModel
      .findByIdAndDelete(id, { returnDocument: 'before' })
      .exec()
      .then((flight) => {
        if (!flight) {
          throw new NotFoundException(`Flight with id '${id}' not found`);
        }
        return flight;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError') {
          throw new BadRequestException(
            `Invalid hexstring id '${id}' provided to delete flight`,
          );
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to delete flight');
      });
  }
}
