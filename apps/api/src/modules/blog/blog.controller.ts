import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@ApiTags('blog')
@Controller('v1/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  // TODO: Add the other CRUD endpoints

  @Post()
  @ApiCreatedResponse({ description: 'Blog created' })
  @ApiBadRequestResponse({
    description: 'Invalid attribute(s) provided to create blog',
  })
  @ApiInternalServerErrorResponse({
    description: 'Failed to create blog due to server error',
  })
  async create(
    @Res() res: FastifyReply,
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<void> {
    const newBlog = await this.blogService.create(createBlogDto);
    res.send(newBlog);
  }

  @Get()
  @ApiOkResponse({ description: 'Blogs found' })
  @ApiInternalServerErrorResponse({
    description: 'Failed to find blogs due to server error',
  })
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const blogs = await this.blogService.findAll();
    res.send(blogs);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Blog found' })
  @ApiBadRequestResponse({
    description: 'Invalid hexstring id provided to find blog',
  })
  @ApiNotFoundResponse({ description: 'Blog with specified id not found' })
  @ApiInternalServerErrorResponse({
    description: 'Failed to find blog due to server error',
  })
  async findOneById(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const blog = await this.blogService.findOneById(id);
    res.send(blog);
  }
}
