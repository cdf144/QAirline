import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Blog } from './blog.schema';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  //Tạo các bài đăng mới về tin tức, khuyến mại, etc...
  async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }
  //Lấy các blog cho người dùng xem
  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }
  //Truy cập vào một bài đăng
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogService.findOne(id);
  }
}
