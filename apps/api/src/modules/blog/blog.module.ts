import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { Blog, BlogSchema } from './blog.schema';
import { BlogService } from './blog.service';
import { DtoModule } from './dto/dto.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    DtoModule,
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
