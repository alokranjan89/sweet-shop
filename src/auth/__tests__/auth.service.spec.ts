import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import * as bcrypt from 'bcrypt';

/* ---------------- MOCK BCRYPT ---------------- */
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

/* ---------------- MOCK REPOSITORY ---------------- */
const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    // reset mocks before each test
    jest.clearAllMocks();
  });

  it('should register a user', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);

    mockUserRepository.create.mockReturnValue({
      email: 'test@test.com',
      password: 'hashed-password',
      role: 'USER',
    });

    mockUserRepository.save.mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      password: 'hashed-password',
      role: 'USER',
    });

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

    const result = await service.register({
      email: 'test@test.com',
      password: '123456',
    });

    expect(result.email).toBe('test@test.com');
    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalled();
  });
});
