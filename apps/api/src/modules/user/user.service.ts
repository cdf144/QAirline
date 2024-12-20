import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { isEmail, isPhoneNumber } from 'class-validator';
import { FilterQuery, Model } from 'mongoose';
import { normalizePhoneNumber } from 'src/utils/phone-number.util';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = await bcrypt.genSalt();
    return await bcrypt.hash(password, saltOrRounds);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().lean().exec();
  }

  async findOneById(id: string): Promise<User | null> {
    return this.findOne({ _id: id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.findOne({ email: email });
  }

  async findOneByPhone(phone: string): Promise<User | null> {
    // Passed in phone number is already validated through getIdentifierType()
    return this.findOne({ phone: normalizePhoneNumber(phone) });
  }

  async findOneByIdCardNumber(idCardNumber: string): Promise<User | null> {
    return this.findOne({ idCardNumber: idCardNumber });
  }

  private async findOne(
    filter: FilterQuery<UserDocument>,
  ): Promise<User | null> {
    return this.userModel
      .findOne(filter)
      .lean()
      .exec()
      .then((user) => {
        return user;
      })
      .catch((error) => {
        this.handleFindErrors(error, filter);
        console.error(error);
        throw new InternalServerErrorException('Failed to find user');
      });
  }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const {
      email: regEmail,
      phone: regPhone,
      idCardNumber: regIdCardNumber,
    } = registerUserDto;

    let normalizedRegPhone = undefined;
    if (regPhone) {
      normalizedRegPhone = normalizePhoneNumber(regPhone);
    }

    // Prevent Mongoose from returning an arbitrary user when one condition has 'undefined' value
    const orFilterConditions = [];
    if (regEmail) {
      orFilterConditions.push({ email: regEmail });
    }
    if (normalizedRegPhone) {
      orFilterConditions.push({ phone: normalizedRegPhone });
    }
    if (regIdCardNumber) {
      orFilterConditions.push({ idCardNumber: regIdCardNumber });
    }

    try {
      const existingUser = await this.findOne({
        $or: orFilterConditions,
      });
      if (existingUser) {
        throw new BadRequestException(
          'Email, phone, or ID card number already in use',
        );
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Failed to create user');
    }

    const hashedPassword = await this.hashPassword(registerUserDto.password);

    const newUser = new this.userModel({
      email: registerUserDto.email,
      password: hashedPassword,
      fullName: registerUserDto.fullName,
      sex: registerUserDto.sex,
      phone: normalizedRegPhone,
      idCardNumber: registerUserDto.idCardNumber,
    });
    return (await newUser.save()).toObject();
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.update({ _id: id }, updateUserDto);
  }

  async updateByEmail(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.update({ email: email }, updateUserDto);
  }

  private async update(
    filter: FilterQuery<UserDocument>,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne(filter);
    const {
      email: newEmail,
      password: newPassword,
      fullName: newFullName,
      sex: newSex,
      phone: newPhone,
      idCardNumber: newIdCardNumber,
    } = updateUserDto;

    // Data already validated in DTO
    if (newEmail) {
      user.email = newEmail;
    }
    if (newPassword) {
      user.password = newPassword;
    }
    if (newFullName) {
      user.fullName = newFullName;
    }
    if (newSex) {
      user.sex = newSex;
    }
    if (newPhone) {
      user.phone = normalizePhoneNumber(newPhone);
    }
    if (newIdCardNumber) {
      user.idCardNumber = newIdCardNumber;
    }

    return this.userModel
      .findOneAndUpdate(filter, user, { new: true })
      .lean()
      .exec();
  }

  async deleteById(id: string): Promise<User> {
    return this.delete({ _id: id });
  }

  async deleteByEmail(email: string): Promise<User> {
    return this.delete({ email: email });
  }

  private async delete(filter: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel
      .findOneAndDelete(filter, { returnDocument: 'before' })
      .lean()
      .exec()
      .then((user) => {
        if (!user) {
          throw new NotFoundException(
            'User with the provided identifier not found',
          );
        }
        return user;
      })
      .catch((error: Error) => {
        this.handleFindErrors(error, filter);
        console.error(error);
        throw new InternalServerErrorException('Failed to delete user');
      });
  }

  /**
   * Handles common errors that occur during user find operations.
   *
   * @param error - The error that was thrown during the find operation.
   * @param filter - An optional filter query used to find the user.
   * @throws NotFoundException - If the error is an instance of NotFoundException.
   * @throws BadRequestException - If the error is a CastError and the filter contains an invalid hexstring id.
   */
  private handleFindErrors(error: Error, filter?: FilterQuery<UserDocument>) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    if (error.name === 'CastError' && filter?._id) {
      throw new BadRequestException(
        `Invalid hexstring id ${filter._id} provided to find user`,
      );
    }
  }

  /**
   * Determines the type of identifier provided.
   *
   * @param identifier - The identifier string to be evaluated.
   * @returns A string indicating the type of the identifier. Possible values are:
   * - 'mongoId': If the identifier matches a 24-character hexadecimal string.
   * - 'email': If the identifier contains an '@' symbol.
   * - 'phone': If the identifier is a 10 or 11 digit number.
   * - 'idCardNumber': If the identifier is a 12 digit number.
   * - 'invalid': If the identifier does not match any of the above patterns.
   */
  getIdentifierType(
    identifier: string,
  ): 'mongoId' | 'email' | 'phone' | 'idCardNumber' | 'invalid' {
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      return 'mongoId';
    }
    if (isEmail(identifier)) {
      return 'email';
    }
    if (isPhoneNumber(identifier, 'VN')) {
      return 'phone';
    }
    if (identifier.match(/^\d{12}$/)) {
      return 'idCardNumber';
    }
    return 'invalid';
  }
}
