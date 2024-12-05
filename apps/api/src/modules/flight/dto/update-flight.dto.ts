import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { IsPriceString } from 'src/app.validators';
import { FlightStatus } from '../schemas/flight.schema';

export class UpdateFlightDto {
  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  @ApiProperty({ example: '2021-09-01T12:00:00.000Z', required: false })
  departureTime?: string;

  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  @ApiProperty({ example: '2021-09-01T13:30:00.000Z', required: false })
  arrivalTime?: string;

  @IsOptional()
  @IsEnum(FlightStatus)
  @ApiProperty({ enum: FlightStatus, required: false })
  status?: FlightStatus;

  @IsOptional()
  @IsPriceString()
  @ApiProperty({ required: false })
  price?: string;
}
