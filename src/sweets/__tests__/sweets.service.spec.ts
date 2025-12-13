import { Test, TestingModule } from '@nestjs/testing';
import { SweetsService } from '../sweets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sweet } from '../sweet.entity';

describe('SweetsService', () => {
  let service: SweetsService;

  const mockSweetRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SweetsService,
        {
          provide: getRepositoryToken(Sweet),
          useValue: mockSweetRepo,
        },
      ],
    }).compile();

    service = module.get<SweetsService>(SweetsService);
    jest.clearAllMocks();
  });

  it('should create a sweet', async () => {
    mockSweetRepo.create.mockReturnValue({ name: 'Ladoo' });
    mockSweetRepo.save.mockResolvedValue({ id: 1, name: 'Ladoo' });

    const result = await service.create({
      name: 'Ladoo',
      category: 'Indian',
      price: 10,
      quantity: 50,
    });

    expect(result.name).toBe('Ladoo');
  });

  it('should return all sweets', async () => {
    mockSweetRepo.find.mockResolvedValue([{ name: 'Barfi' }]);

    const result = await service.findAll();

    expect(result.length).toBe(1);
  });

  it('should reduce quantity when purchasing', async () => {
    mockSweetRepo.findOne.mockResolvedValue({
      id: 1,
      quantity: 5,
    });
    mockSweetRepo.save.mockResolvedValue({
      id: 1,
      quantity: 4,
    });

    const result = await service.purchase(1);

    expect(result.quantity).toBe(4);
  });
});