import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAircraftDto {
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  totalSeat: number;

  @IsNumber()
  economySeat: number;

  @IsNumber()
  businessSeat: number;
}
