import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtPayloadResult } from '../common/interfaces/jwt-payload-result.interface';
import { User } from '../modules/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // NOTE: The AuthGuards used passes the request body to be validated by the corresponding Passport Strategy. After the validation, a 'user' property is added to the request object. FastifyRequest doesn't have a 'user' property, so no type is defined for the request object in the controller methods.

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Req() req) {
    return this.authService.login(req.user as Omit<User, 'password'>);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWTBearerAuth')
  getProfile(@Req() req) {
    return req.user as JwtPayloadResult;
  }
}
