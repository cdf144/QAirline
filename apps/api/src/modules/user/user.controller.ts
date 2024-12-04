import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('v1/user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Email already in use' })
  @ApiResponse({
    status: 500,
    description: 'Failed to create user due to server error',
  })
  async createUser(
    @Res() res: FastifyReply,
    @Body() RegisterDto: RegisterDto,
  ): Promise<void> {
    const user = await this.UserService.createUser(RegisterDto);
    res.code(201).send(user);
  }
}
