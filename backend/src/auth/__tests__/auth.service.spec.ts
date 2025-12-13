import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService, // ✅ FIXED
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should register a user', async () => {
    // mock bcrypt hash
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    mockUserRepository.create.mockReturnValue({
      email: 'test@test.com',
      password: 'hashedPassword',
    });

    mockUserRepository.save.mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      password: 'hashedPassword',
    });

    const result = await service.register('test@test.com', '123456');

    expect(result).toEqual({
      message: 'User registered successfully',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalled();
  });
});
