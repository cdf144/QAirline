import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Status } from '../flight.schema';

export class CreateFlightDto {
  @IsNumber()
  @IsNotEmpty()
  aircraftId: number;

  @IsNumber()
  @IsNotEmpty()
  departureAirportId: number;

  @IsNumber()
  @IsNotEmpty()
  destinationAirportId: number;

  @IsDateString()
  @IsNotEmpty()
  dayFlight: Date;

  @IsEnum(Status)
  status: Status;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
