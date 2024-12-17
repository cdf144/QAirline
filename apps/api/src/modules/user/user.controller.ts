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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}
  // TODO: Add Swagger Response documentation for each endpoint that doesn't have it yet

  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const users = await this.userService.findAll();
    res.send(users);
  }

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
        // TODO: Implement find by phone number
        break;
      case 'idCardNumber':
        // TODO: Implement find by ID card number
        break;
      default:
        throw new BadRequestException(
          'Invalid identifier provided. Must be a valid 24-character hexadecimal string, or a valid email address, phone number, or Vietnamese ID card number',
        );
    }

    res.send(user);
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'User created' })
  @ApiBadRequestResponse({
    description: 'Email, phone, or ID card number already in use',
  })
  @ApiInternalServerErrorResponse({
    description: 'Failed to create user due to server error',
  })
  async create(
    @Res() res: FastifyReply,
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<void> {
    const newUser = await this.userService.create(registerUserDto);
    res.send(newUser);
  }

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

  // TODO: Add login endpoint
  // TODO: Add find user's tickets endpoint
}
