import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Category } from '../schemas/blog.schema';

export class CreateBlogDto {
  @IsOptional()
  @IsString()
  @Length(24, 24)
  adminId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}
