import { Test, TestingModule } from '@nestjs/testing';
import { FastifyReply } from 'fastify';
import { Types } from 'mongoose';
import { Role } from 'src/common/enums/role.enum';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Gender, User } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let mockUserService: Partial<UserService>;

  const mockUser: User = {
    _id: Types.ObjectId.createFromHexString('48f256b4d353fd5c75739500'),
    __v: 0,
    email: 'test@example.com',
    password: 'password',
    fullName: 'Test User',
    sex: Gender.Male,
    phone: '+84123456789',
    idCardNumber: '000000000000',
    createdAt: new Date(),
    roles: [Role.User],
  };

  beforeEach(async () => {
    mockUserService = {
      findAll: jest.fn().mockResolvedValue([mockUser]),
      findOneByEmail: jest.fn().mockResolvedValue(mockUser),
      create: jest.fn().mockResolvedValue(mockUser),
      updateByEmail: jest.fn().mockResolvedValue(mockUser),
      updateById: jest.fn().mockResolvedValue(mockUser),
      deleteByEmail: jest.fn().mockResolvedValue(mockUser),
      getIdentifierType: jest.fn().mockImplementation((identifier: string) => {
        return Types.ObjectId.isValid(identifier) ? 'mongoId' : 'email';
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const res = {
        send: jest.fn(),
      } as unknown as FastifyReply;

      await controller.findAll(res);

      expect(service.findAll).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const res = {
        send: jest.fn(),
      } as unknown as FastifyReply;

      await controller.findOne(res, 'test@example.com');

      expect(service.findOneByEmail).toHaveBeenCalledWith('test@example.com');
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as FastifyReply;

      const registerUserDto: RegisterUserDto = {
        email: 'test@example.com',
        password: 'password',
        fullName: 'Test User',
        sex: Gender.Male,
        phone: '+84123456789',
        idCardNumber: '000000000000',
      };

      await controller.create(res, registerUserDto);

      expect(service.create).toHaveBeenCalledWith(registerUserDto);
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const res = {
        send: jest.fn(),
      } as unknown as FastifyReply;

      const updateUserDto: UpdateUserDto = {
        fullName: 'Updated User',
      };

      await controller.update(res, '48f256b4d353fd5c75739500', updateUserDto);

      expect(service.updateById).toHaveBeenCalledWith(
        '48f256b4d353fd5c75739500',
        updateUserDto,
      );
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const res = {
        send: jest.fn(),
      } as unknown as FastifyReply;

      await controller.delete(res, 'test@example.com');

      expect(service.deleteByEmail).toHaveBeenCalledWith('test@example.com');
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
  });
});
