import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('v1/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(
    @Res() res: FastifyReply,
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<void> {
    const blog = await this.blogService.create(createBlogDto);
    res.send(blog);
  }

  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const blogs = await this.blogService.findAll();
    res.send(blogs);
  }

  @Get(':id')
  async findOne(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const blog = await this.blogService.findOneById(id);
    res.send(blog);
  }
}
