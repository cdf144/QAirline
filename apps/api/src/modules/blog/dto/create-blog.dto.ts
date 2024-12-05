import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsHexStringId } from 'src/app.validators';
import { Category } from '../schemas/blog.schema';

export class CreateBlogDto {
  @IsOptional()
  @IsHexStringId()
  @ApiProperty({ required: false })
  adminId: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  body: string;

  @IsEnum(Category)
  @ApiProperty({ enum: Category })
  category: Category;
}
