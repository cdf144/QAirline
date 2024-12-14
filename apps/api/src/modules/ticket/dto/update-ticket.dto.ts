import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { IsPriceString } from 'src/app.validators';
import { TicketStatus } from '../schemas/ticket.schema';

export class UpdateTicketDto {
  @IsOptional()
  @IsEnum(TicketStatus)
  @ApiProperty({ enum: TicketStatus, required: false })
  status?: TicketStatus;

  @IsOptional()
  @IsPriceString()
  @ApiProperty({ required: false })
  totalPrice?: string;
}
