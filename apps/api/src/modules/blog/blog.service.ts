import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogModel
      .findById(id)
      .exec()
      .then((blog) => {
        if (!blog) {
          throw new NotFoundException(`Blog with id ${id} not found`);
        }
        return blog;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to find blog');
      });
  }
}
