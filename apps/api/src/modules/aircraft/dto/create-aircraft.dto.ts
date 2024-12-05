import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAircraftDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  model: string;

  @IsNumber()
  @ApiProperty()
  economySeat: number;

  @IsNumber()
  @ApiProperty({ required: false })
  businessSeat: number;
}
