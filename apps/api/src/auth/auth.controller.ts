import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { COOKIE_NAMES } from 'src/common/constants';
import { ConditionalApiCookieAuth } from 'src/common/decorators/conditional-api-cookie-auth.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtPayloadResult } from '../common/interfaces/jwt-payload.interface';
import { User } from '../modules/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@ConditionalApiCookieAuth(COOKIE_NAMES.ACCESS_TOKEN)
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // NOTE: The AuthGuards used passes the request body to be validated by the corresponding Passport Strategy. After the validation, a 'user' property is added to the request object. FastifyRequest doesn't have a 'user' property, so no type is defined for the request object in the controller methods.

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Req() req, @Res() res: FastifyReply) {
    const loginResult = this.authService.login(
      req.user as Omit<User, 'password'>,
    );
    res.setCookie(COOKIE_NAMES.ACCESS_TOKEN, loginResult.accessToken, {
      path: '/',
      httpOnly: true,
    });
    res.send(loginResult);
  }

  @Get('me')
  getProfile(@Req() req) {
    return req.user as JwtPayloadResult;
  }
}
