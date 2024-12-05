import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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

  @Expose()
  @Max(1000, { message: 'Total number of seats must not be greater than 1000' })
  get totalSeat() {
    return this.economySeat + this.businessSeat;
  }
}
