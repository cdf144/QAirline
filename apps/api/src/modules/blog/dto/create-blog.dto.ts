import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../blog.schema';

export class CreateBlogDto {
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
