import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog, BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    let adminObjectId = null;
    if (createBlogDto.adminId) {
      adminObjectId = Types.ObjectId.createFromHexString(createBlogDto.adminId);
    }

    const createdBlog = new this.blogModel({
      adminId: adminObjectId,
      title: createBlogDto.title,
      body: createBlogDto.body,
      category: createBlogDto.category,
    });
    return createdBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOneById(id: string): Promise<Blog> {
    return this.blogModel
      .findById(id)
      .exec()
      .then((blog) => {
        if (!blog) {
          throw new NotFoundException(`Blog with id '${id}' not found`);
        }
        return blog;
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw error;
        }
        if (error.name === 'CastError') {
          throw new BadRequestException(
            `Invalid hexstring id '${id}' provided to find blog`,
          );
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to find blog');
      });
  }
}
