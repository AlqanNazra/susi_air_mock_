
import { Test, TestingModule } from '@nestjs/testing';
import { MockDataService } from '../data/mock-data/mock-data.service.js';
import { FlightHoursService } from './flight-hours.service.js';

describe('FlightHoursService', () => {
  let service: FlightHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlightHoursService,
        {
          provide: MockDataService,
          useValue: {
            getFlightHoursData: () => ({
              limits: {
                daily: 8,
                weekly: 40,
                monthly: 100,
                annual: 1050,
              },
              chartBounds: {
                '1w': { limit: 40, max: 45, windowDays: 7, displayRangeDays: 7 },
                '1m': { limit: 100, max: 125, windowDays: 30, displayRangeDays: 7 },
                '3m': { limit: 300, max: 325, windowDays: 90, displayRangeDays: 7 },
                '6m': { limit: 600, max: 625, windowDays: 180, displayRangeDays: 7 },
                '1y': { limit: 1050, max: 1200, windowDays: 365, displayRangeDays: 7 },
              },
              flightHours: [
                { date: '2026-05-14', hours: 5 },
                { date: '2026-05-15', hours: 6 },
              ],
            }),
          },
        },
      ],
    }).compile();

    service = module.get<FlightHoursService>(FlightHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return daily records for the requested range', () => {
    expect(
      service.getFlightHours('2026-05-14', '2026-05-15').data,
    ).toEqual([
      { date: '2026-05-14', hours: 5 },
      { date: '2026-05-15', hours: 6 },
    ]);
  });

  it('should reject an invalid date range', () => {
    expect(() =>
      service.getFlightHours('2026-05-16', '2026-05-15'),
    ).toThrow();
  });
});
