import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('v1/user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'User created' })
  @ApiBadRequestResponse({
    description: 'Email, phone, or ID card number already in use',
  })
  @ApiInternalServerErrorResponse({
    description: 'Failed to create user due to server error',
  })
  async createUser(
    @Res() res: FastifyReply,
    @Body() RegisterDto: RegisterDto,
  ): Promise<void> {
    const newUser = await this.UserService.createUser(RegisterDto);
    res.send(newUser);
  }

  // TODO: Add login endpoint
}
