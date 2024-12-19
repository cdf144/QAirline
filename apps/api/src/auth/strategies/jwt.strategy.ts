import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Strategy as JwtPassportStrategy } from 'passport-jwt';
import { COOKIE_NAMES } from 'src/common/constants';
import {
  JwtPayloadClaims,
  JwtPayloadResult,
} from 'src/common/interfaces/jwt-payload.interface';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtPassportStrategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: cookieTokenExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadClaims): Promise<JwtPayloadResult> {
    const user = await this.userService.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}

const cookieTokenExtractor = (req: FastifyRequest) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[COOKIE_NAMES.ACCESS_TOKEN];
  }
  return token;
};
