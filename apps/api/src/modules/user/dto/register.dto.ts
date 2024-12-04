import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '../schemas/user.schema';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty({ enum: Gender })
  sex: Gender;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  idCardNumber: string;
}
