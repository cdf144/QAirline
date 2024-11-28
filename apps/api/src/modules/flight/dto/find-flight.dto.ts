import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class FlightFindDto {
  @IsString()
  @IsNotEmpty()
  departure: string;

  @IsString()
  @IsNotEmpty()
  arrival: string;

  @IsDateString()
  @IsNotEmpty()
  fromDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
