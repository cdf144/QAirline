import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ClassType, TripType } from '../ticket.schema';

export class CreateTicketDto {
  @IsEnum(TripType)
  @IsNotEmpty()
  tripType: TripType;

  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsNumber()
  @IsNotEmpty()
  outBoundFlightId: number;

  @IsNumber()
  returnFlightId: number;

  @IsString()
  seat: string;

  @IsNumber()
  totalPrice: number;

  @IsDateString()
  departureTime: Date;

  @IsEnum(ClassType)
  classType: ClassType;
}
