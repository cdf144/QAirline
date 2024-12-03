import { Body, Controller, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('v1/user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('register')
  async createUser(
    @Res() res: FastifyReply,
    @Body() RegisterDto: RegisterDto,
  ): Promise<void> {
    const user = await this.UserService.createUser(RegisterDto);
    res.code(201).send(user);
  }
}
