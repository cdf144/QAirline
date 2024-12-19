import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResult } from 'src/common/interfaces/login-result.interface';
import { User } from 'src/modules/user/schemas/user.schema';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const foundUser = await this.userService.findOneByEmail(email);
    if (foundUser && foundUser.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = foundUser;
      return result;
    }
    return null;
  }

  login(user: Omit<User, 'password'>): LoginResult {
    const payload = { email: user.email, sub: user._id.toString() };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
