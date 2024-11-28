import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../blog.schema';

export class CreateBlogDto {
  @IsNumber()
  @IsNotEmpty()
  adminId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}
