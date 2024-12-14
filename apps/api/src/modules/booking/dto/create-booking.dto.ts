import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { IsHexStringId } from 'src/app.validators';
import { ClassType } from '../schemas/booking.schema';

export class CreateBookingDto {
  @IsHexStringId()
  @ApiProperty()
  userId: string;

  @IsEnum(ClassType)
  @ApiProperty({ enum: ClassType })
  classType: ClassType;
}
