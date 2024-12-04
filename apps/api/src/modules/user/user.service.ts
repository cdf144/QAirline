import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { normalizePhoneNumber } from 'src/utils/phone-number.util';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const { email, phone, idCardNumber } = registerDto;
    const normalizedPhone = normalizePhoneNumber(phone);
    return this.userModel
      .findOne({
        $or: [{ email }, { phone: normalizedPhone }, { idCardNumber }],
      })
      .exec()
      .then((existingUser) => {
        if (existingUser) {
          if (existingUser.email === email) {
            throw new BadRequestException('Email already in use');
          }
          if (existingUser.phone === normalizedPhone) {
            throw new BadRequestException('Phone already in use');
          }
          if (existingUser.idCardNumber === idCardNumber) {
            throw new BadRequestException('ID card number already in use');
          }
        }

        const newUser = new this.userModel({
          email: registerDto.email,
          password: registerDto.password,
          fullName: registerDto.fullName,
          sex: registerDto.sex,
          phone: normalizedPhone,
          idCardNumber: registerDto.idCardNumber,
        });
        return newUser.save();
      })
      .catch((error) => {
        if (error instanceof BadRequestException) {
          throw error;
        }
        console.error(error);
        throw new InternalServerErrorException('Failed to create user');
      });
  }
}
