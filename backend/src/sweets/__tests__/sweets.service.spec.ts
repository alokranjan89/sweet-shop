import { Test, TestingModule } from '@nestjs/testing';
import { SweetsService } from '../sweets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sweet } from '../sweet.entity';
import { NotFoundException } from '@nestjs/common';

describe('SweetsService', () => {
  let service: SweetsService;

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  const mockSweetRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
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

  // ✅ CREATE
  it('should create a sweet', async () => {
    mockSweetRepo.create.mockReturnValue({ name: 'Ladoo' });
    mockSweetRepo.save.mockResolvedValue({
      id: 1,
      name: 'Ladoo',
      category: 'Indian',
      price: 10,
      quantity: 50,
    });

    const result = await service.create({
      name: 'Ladoo',
      category: 'Indian',
      price: 10,
      quantity: 50,
    });

    expect(result.name).toBe('Ladoo');
    expect(mockSweetRepo.create).toHaveBeenCalled();
    expect(mockSweetRepo.save).toHaveBeenCalled();
  });

  // ✅ READ
  it('should return all sweets', async () => {
    mockSweetRepo.find.mockResolvedValue([{ name: 'Barfi' }]);

    const result = await service.findAll();

    expect(result.length).toBe(1);
    expect(mockSweetRepo.find).toHaveBeenCalled();
  });

  // ✅ SEARCH (IMPORTANT)
  it('should search sweets by name', async () => {
    mockQueryBuilder.getMany.mockResolvedValue([
      { name: 'Kaju Katli' },
    ]);

    const result = await service.search({ name: 'Kaju' });

    expect(result[0].name).toBe('Kaju Katli');
    expect(mockSweetRepo.createQueryBuilder).toHaveBeenCalled();
  });

  // ✅ PURCHASE
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


  it('should throw error if sweet not found', async () => {
    mockSweetRepo.findOne.mockResolvedValue(null);

    await expect(service.purchase(999)).rejects.toThrow(
      NotFoundException,
    );
  });
});
