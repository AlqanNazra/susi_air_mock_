
import { BadRequestException, Injectable } from '@nestjs/common';
import { MockDataService } from '../data/mock-data/mock-data.service.js';

type ScheduleRecord = {
  id: string;
  duty_date: string;
  status: number;
  base_name: string;
  base_color: string;
  duty_type: string;
  count_schedules: number;
  count_logbooks: number;
};

type DutyLegend = {
  code: string;
  label: string;
  color: string;
};

@Injectable()
export class SchedulesService {
  constructor(private readonly mockDataService: MockDataService) {}

  getSchedules(yearInput: string, monthInput: string) {
    const year = this.parseInteger(yearInput, 'year');
    const month = this.parseInteger(monthInput, 'month');

    if (year < 1 || year > 9999) {
      throw new BadRequestException(
        'year must be between 1 and 9999',
      );
    }

    if (month < 1 || month > 12) {
      throw new BadRequestException(
        'month must be between 1 and 12',
      );
    }

    const source = this.mockDataService.getSchedulesData();
    const allSchedules = source.schedules as ScheduleRecord[];
    const legend = source.legend as DutyLegend[];

    const monthPrefix =
      `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-`;

    const schedules = allSchedules
      .filter((item) => item.duty_date.startsWith(monthPrefix))
      .sort((a, b) => a.duty_date.localeCompare(b.duty_date))
      .map((item) => ({
        ...item,
        remainingDuties: Math.max(
          0,
          item.count_schedules - item.count_logbooks,
        ),
        isComplete:
          item.count_logbooks === item.count_schedules,
      }));

    return {
      year,
      month,
      today: source.today,
      schedules,
      legend,
    };
  }

  private parseInteger(value: string, field: string): number {
    if (
      typeof value !== 'string' ||
      !/^\d+$/.test(value)
    ) {
      throw new BadRequestException(
        `${field} must be an integer`,
      );
    }

    const parsed = Number(value);

    if (!Number.isSafeInteger(parsed)) {
      throw new BadRequestException(
        `${field} must be a safe integer`,
      );
    }

    return parsed;
  }
}
