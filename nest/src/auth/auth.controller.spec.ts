
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: vi.fn().mockResolvedValue({
              access_token: 'mock-access-token',
              token_type: 'Bearer',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate login to AuthService', async () => {
    await expect(
      controller.login({
        username: 'johndoe',
        password: 'susiairtest',
      }),
    ).resolves.toEqual({
      access_token: 'mock-access-token',
      token_type: 'Bearer',
    });
  });
});
