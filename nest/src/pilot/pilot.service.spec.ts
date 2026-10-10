
import { Test, TestingModule } from '@nestjs/testing';
import { MockDataService } from '../data/mock-data/mock-data.service.js';
import { PilotService } from './pilot.service.js';

describe('PilotService', () => {
  let service: PilotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PilotService,
        {
          provide: MockDataService,
          useValue: {
            getFlightHoursData: () => ({
              pilot: {
                name: 'John Doe',
                totalFlightHours: 1444.5,
              },
            }),
          },
        },
      ],
    }).compile();

    service = module.get<PilotService>(PilotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
