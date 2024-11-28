import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { email, password } = signInDto;
    const user = await this.userService.findUserByEmail(email);
    if (user?.password != password) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, password: password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
