import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { COOKIE_NAMES } from 'src/common/constants';
import { ConditionalApiCookieAuth } from 'src/common/decorators/conditional-api-cookie-auth.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { OwnershipGuard } from 'src/common/guards/ownership.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@ApiTags('user')
@ConditionalApiCookieAuth(COOKIE_NAMES.ACCESS_TOKEN)
@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.Admin)
  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const users = await this.userService.findAll();
    res.send(users);
  }

  @UseGuards(OwnershipGuard)
  @Get(':identifier')
  async findOne(
    @Res() res: FastifyReply,
    @Param('identifier') identifier: string,
  ): Promise<void> {
    const identifierType = this.userService.getIdentifierType(identifier);
    let user: User;

    switch (identifierType) {
      case 'mongoId':
        user = await this.userService.findOneById(identifier);
        break;
      case 'email':
        user = await this.userService.findOneByEmail(identifier);
        break;
      case 'phone':
        user = await this.userService.findOneByPhone(identifier);
        break;
      case 'idCardNumber':
        user = await this.userService.findOneByIdCardNumber(identifier);
        break;
      default:
        throw new BadRequestException(
          'Invalid identifier provided. Must be a valid 24-character hexadecimal string, or a valid email address, phone number, or Vietnamese ID card number',
        );
    }

    res.send(user);
  }

  @Public()
  @Post('register')
  async create(
    @Res() res: FastifyReply,
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<void> {
    const newUser = await this.userService.create(registerUserDto);
    res.send(newUser);
  }

  @UseGuards(OwnershipGuard)
  @Patch(':identifier')
  async update(
    @Res() res: FastifyReply,
    @Param('identifier') identifier: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const identifierType = this.userService.getIdentifierType(identifier);
    let updatedUser: User;

    switch (identifierType) {
      case 'mongoId':
        updatedUser = await this.userService.updateById(
          identifier,
          updateUserDto,
        );
        break;
      case 'email':
        updatedUser = await this.userService.updateByEmail(
          identifier,
          updateUserDto,
        );
        break;
      default:
        throw new BadRequestException(
          'Invalid identifier provided. Must be a valid 24-character hexadecimal string, or a valid email address',
        );
    }

    res.send(updatedUser);
  }

  @UseGuards(OwnershipGuard)
  @Delete(':identifier')
  async delete(
    @Res() res: FastifyReply,
    @Param('identifier') identifier: string,
  ): Promise<void> {
    const identifierType = this.userService.getIdentifierType(identifier);
    let deletedUser: User;

    switch (identifierType) {
      case 'mongoId':
        deletedUser = await this.userService.deleteById(identifier);
        break;
      case 'email':
        deletedUser = await this.userService.deleteByEmail(identifier);
        break;
      default:
        throw new BadRequestException(
          'Invalid identifier provided. Must be a valid 24-character hexadecimal string, or a valid email address',
        );
    }

    res.send(deletedUser);
  }

  // TODO: Add find user's tickets endpoint
}
