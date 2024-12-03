import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Post('register')
  async createUser(@Body() RegisterDto: RegisterDto): Promise<User> {
    return this.UserService.createUser(RegisterDto);
  }
}
