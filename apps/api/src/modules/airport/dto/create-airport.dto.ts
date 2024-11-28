import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAirportDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}
