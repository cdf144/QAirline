import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const { email } = registerDto;
    return this.userModel
      .findOne({ email })
      .exec()
      .then((user) => {
        if (user) {
          throw new BadRequestException('Email already in use');
        }
        const newUser = new this.userModel({
          email,
          password: registerDto.password,
          fullName: registerDto.fullName,
          sex: registerDto.sex,
          phone: registerDto.phone,
          IDCardNumber: registerDto.IDCardNumber,
          isAdmin: false,
          createdAt: new Date(),
        });
        return newUser.save();
      })
      .catch((error) => {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new InternalServerErrorException('Failed to create user');
      });
  }
}
