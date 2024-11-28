import { IsNotEmpty, IsString } from 'class-validator';

export class FindTicketByIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
