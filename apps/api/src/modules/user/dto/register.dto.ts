import { IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '../schemas/user.schema';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  sex: Gender;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  IDCardNumber: string;
}
