
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: { signAsync: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    jwtService = {
      signAsync: vi.fn().mockResolvedValue('mock-access-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an access token for valid credentials', async () => {
    const result = await service.login({
      username: 'johndoe',
      password: 'susiairtest',
    });

    expect(result).toEqual({
      access_token: 'mock-access-token',
      token_type: 'Bearer',
    });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 'johndoe',
    });
  });

  it('should reject invalid credentials', async () => {
    await expect(
      service.login({
        username: 'wrong-user',
        password: 'wrong-password',
      }),
    ).rejects.toMatchObject({
      status: 401,
    });
  });
});
