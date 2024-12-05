import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Equals, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { IsHexStringId, IsPriceString } from 'src/app.validators';
import { FlightStatus } from '../schemas/flight.schema';

export class CreateFlightDto {
  @IsHexStringId()
  @ApiProperty({ required: true })
  aircraftId: string;

  @IsHexStringId()
  @ApiProperty({ required: true })
  departureAirportId: string;

  @IsHexStringId()
  @ApiProperty({ required: true })
  destinationAirportId: string;

  @IsDateString({ strict: true, strictSeparator: true })
  @ApiProperty({ example: '2021-09-01T12:00:00.000Z', required: true })
  departureTime: string;

  @IsDateString({ strict: true, strictSeparator: true })
  @ApiProperty({ example: '2021-09-01T13:30:00.000Z', required: true })
  arrivalTime: string;

  @IsOptional()
  @IsEnum(FlightStatus)
  @ApiProperty({ enum: FlightStatus, default: FlightStatus.Scheduled })
  status: FlightStatus = FlightStatus.Scheduled;

  @IsPriceString()
  @ApiProperty({ required: true })
  price: string;

  @Expose()
  @Equals(true, { message: 'Departure time must be before arrival time' })
  get isValidTimes() {
    return new Date(this.departureTime) < new Date(this.arrivalTime);
  }
}
