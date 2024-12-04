import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('v1/user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email, phone, or ID card number already in use',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Failed to create user due to server error',
  })
  async createUser(
    @Res() res: FastifyReply,
    @Body() RegisterDto: RegisterDto,
  ): Promise<void> {
    const user = await this.UserService.createUser(RegisterDto);
    res.send(user);
  }
}
