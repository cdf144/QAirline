import { ApiProperty } from '@nestjs/swagger';
import { IsVietnamAirportCode } from 'src/app.validators';

export class CreateAirportDto {
  @IsVietnamAirportCode()
  @ApiProperty()
  code: string;
}
