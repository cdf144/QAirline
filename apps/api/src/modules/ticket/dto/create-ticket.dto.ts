import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsHexStringId, IsPriceString } from 'src/app.validators';
import { TicketStatus, TripType } from '../schemas/ticket.schema';

export class CreateTicketDto {
  @IsHexStringId()
  @ApiProperty()
  bookingId: string;

  @IsEnum(TripType)
  @ApiProperty({ enum: TripType })
  tripType: TripType;

  @IsHexStringId()
  @ApiProperty()
  outboundFlightId: string;

  @IsOptional()
  @IsHexStringId()
  @ApiProperty({ required: false })
  returnFlightId?: string;

  // TODO: Consensus on seat format and validation
  @IsString()
  @ApiProperty()
  seat: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  @ApiProperty({ enum: TicketStatus, required: false })
  status?: TicketStatus;

  @IsPriceString()
  @ApiProperty()
  totalPrice: string;
}
