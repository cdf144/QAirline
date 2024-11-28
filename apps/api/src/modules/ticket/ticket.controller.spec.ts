import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketController } from './ticket.controller';
import { ClassType, Status, Ticket, TripType } from './ticket.schema';
import { TicketService } from './ticket.service';

const mockTicket = {
  userEmail: 'user@example.com',
  outBoundFlightId: 123,
  bookingDate: new Date('2024-01-10T00:00:00Z'),
  seat: 'A1',
  classType: ClassType.Economy,
  tripType: TripType.OneWay,
  status: Status.Pending,
};

const mockTicketModel = {
  create: jest.fn().mockResolvedValue(mockTicket),
  find: jest.fn().mockResolvedValue([mockTicket]),
  findOne: jest.fn().mockResolvedValue(mockTicket),
  findById: jest.fn().mockResolvedValue(mockTicket),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockTicket),
  findOneAndDelete: jest.fn().mockResolvedValue(mockTicket),
};

describe('TicketController', () => {
  let controller: TicketController;
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        TicketService,
        {
          provide: getModelToken(Ticket.name),
          useValue: mockTicketModel,
        },
      ],
    }).compile();

    controller = module.get<TicketController>(TicketController);
    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a ticket', async () => {
    const createTicketDto: CreateTicketDto = {
      userEmail: 'user@example.com',
      outBoundFlightId: 123,
      returnFlightId: null,
      totalPrice: 1000,
      departureTime: new Date('2024-01-10T00:00:00Z'),
      seat: 'A1',
      classType: ClassType.Business,
      tripType: TripType.OneWay,
    };
    await expect(controller.createTicket(createTicketDto)).resolves.toEqual({
      message: 'Ticket created successfully',
    });
    expect(service.createTicket).toHaveBeenCalledWith(createTicketDto);
  });

  it('should get all tickets', async () => {
    await expect(controller.getAllTickets('user@example.com')).resolves.toEqual(
      [mockTicket],
    );
    expect(service.getAllTickets).toHaveBeenCalledWith('user@example.com');
  });

  it('should get a ticket by ID', async () => {
    await expect(
      controller.getTicketById('5f8d0d55b54764421b7156d1', 'user@example.com'),
    ).resolves.toEqual(mockTicket);
    expect(service.getTicketById).toHaveBeenCalledWith(
      '5f8d0d55b54764421b7156d1',
      'user@example.com',
    );
  });

  it('should cancel a ticket', async () => {
    await expect(
      controller.cancelTicket('user@example.com', '5f8d0d55b54764421b7156d1'),
    ).resolves.toEqual({ message: 'Ticket canceled successfully' });
    expect(service.cancelTicket).toHaveBeenCalledWith(
      '5f8d0d55b54764421b7156d1',
      'user@example.com',
    );
  });
});
