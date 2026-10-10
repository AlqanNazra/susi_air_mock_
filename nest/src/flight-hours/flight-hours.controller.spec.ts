
import { Test, TestingModule } from '@nestjs/testing';
import { FlightHoursController } from './flight-hours.controller.js';
import { FlightHoursService } from './flight-hours.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';

describe('FlightHoursController', () => {
  let controller: FlightHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightHoursController],
      providers: [
        {
          provide: FlightHoursService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<FlightHoursController>(FlightHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
