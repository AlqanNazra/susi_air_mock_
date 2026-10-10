
import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service.js';
import { MockDataService } from '../data/mock-data/mock-data.service.js';

describe('SchedulesService', () => {
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: MockDataService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
