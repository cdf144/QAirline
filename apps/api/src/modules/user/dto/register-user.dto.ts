import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IsVietnamIdCardNumber } from 'src/app.validators';
import { Gender } from '../schemas/user.schema';

export class RegisterUserDto {
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  // TODO: Finalize on password constraints and validation
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly fullName?: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({ enum: Gender, required: false })
  readonly sex?: Gender;

  @IsOptional()
  @IsPhoneNumber('VN')
  @ApiProperty({ required: false })
  readonly phone?: string;

  @IsOptional()
  @IsVietnamIdCardNumber()
  @ApiProperty({ required: false })
  readonly idCardNumber?: string;
}
