import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { Role } from 'src/common/enums/role.enum';
import { Gender, User } from './schemas/user.schema';
import { UserService } from './user.service';

const mockUser = {
  _id: Types.ObjectId.createFromHexString('48f256b4d353fd5c75739500'),
  __v: 0,
  email: 'test@example.com',
  password: 'password',
  fullName: 'John Doe',
  sex: Gender.Male,
  phone: '+84123456789',
  idCardNumber: null,
  createdAt: new Date('2024-01-01T00:30:00.000Z'),
  roles: [Role.User],
};

const mockUserModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user by id', async () => {
    jest.spyOn(service, 'findOneById').mockResolvedValueOnce(mockUser);

    const result = await service.findOneById('48f256b4d353fd5c75739500');
    expect(result).toEqual(mockUser);
    expect(service['findOneById']).toHaveBeenCalledWith(
      '48f256b4d353fd5c75739500',
    );
  });

  it('should return a user by email', async () => {
    jest.spyOn(service, 'findOneByEmail').mockResolvedValueOnce(mockUser);

    const result = await service.findOneByEmail('test@example.com');
    expect(result).toEqual(mockUser);
    expect(service['findOneByEmail']).toHaveBeenCalledWith('test@example.com');
  });
});
