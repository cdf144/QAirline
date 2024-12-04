import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Category } from '../schemas/blog.schema';

export class CreateBlogDto {
  @IsOptional()
  @Length(24, 24)
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
