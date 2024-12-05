import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString, Max } from 'class-validator';

export class CreateAircraftDto {
  @IsString()
  @ApiProperty()
  manufacturer: string;

  @IsString()
  @ApiProperty()
  model: string;

  @IsPositive()
  @Max(1000)
  @ApiProperty()
  economySeat: number;

  @IsOptional()
  @IsPositive()
  @Max(1000)
  @ApiProperty({ required: false })
  businessSeat: number = 0;
}
