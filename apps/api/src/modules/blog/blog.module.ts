import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { Blog, BlogSchema } from './blog.schema';
import { BlogService } from './blog.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
