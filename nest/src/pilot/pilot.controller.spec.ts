
import { Test, TestingModule } from '@nestjs/testing';
import { PilotController } from './pilot.controller.js';
import { PilotService } from './pilot.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';

describe('PilotController', () => {
  let controller: PilotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PilotController],
      providers: [
        {
          provide: PilotService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<PilotController>(PilotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
