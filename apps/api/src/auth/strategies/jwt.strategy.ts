import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Strategy as JwtPassportStrategy } from 'passport-jwt';
import { COOKIE_NAMES } from 'src/common/constants';
import { JwtPayloadResult } from 'src/common/interfaces/jwt-payload-result.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtPassportStrategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: cookieTokenExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  validate(payload: any): JwtPayloadResult {
    return { userId: payload.sub, email: payload.email };
  }
}

const cookieTokenExtractor = (req: FastifyRequest) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[COOKIE_NAMES.ACCESS_TOKEN];
  }
  return token;
};
