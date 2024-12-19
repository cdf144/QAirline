import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { COOKIE_NAMES } from 'src/common/constants';
import { ConditionalApiCookieAuth } from 'src/common/decorators/conditional-api-cookie-auth.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@ApiTags('blog')
@ConditionalApiCookieAuth(COOKIE_NAMES.ACCESS_TOKEN)
@Controller('v1/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  // TODO: Add the other CRUD endpoints

  @Roles(Role.Admin)
  @Post()
  async create(
    @Res() res: FastifyReply,
    @Body() createBlogDto: CreateBlogDto,
  ): Promise<void> {
    const newBlog = await this.blogService.create(createBlogDto);
    res.send(newBlog);
  }

  @Public()
  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const blogs = await this.blogService.findAll();
    res.send(blogs);
  }

  @Public()
  @Get(':id')
  async findOne(
    @Res() res: FastifyReply,
    @Param('id') id: string,
  ): Promise<void> {
    const blog = await this.blogService.findOne(id);
    res.send(blog);
  }
}
