
import { BadRequestException, Injectable } from '@nestjs/common';
import { MockDataService } from '../data/mock-data/mock-data.service.js';

type FlightHourRecord = {
  date: string;
  hours: number;
};
type ChartRange = '1w' | '1m' | '3m' | '6m' | '1y';
type ChartBound = {
  limit: number;
  max: number;
  windowDays: number;
  displayRangeDays: number;
};
const REFERENCE_DATE = '2026-05-15';
const VALID_RANGES: ChartRange[] = ['1w', '1m', '3m', '6m', '1y'];
@Injectable()
export class FlightHoursService {
  constructor(private readonly mockDataService: MockDataService) {}
  getFlightHours(from: string, to: string) {
    this.validateDate(from, 'from');
    this.validateDate(to, 'to');
    if (from > to) {
      throw new BadRequestException(
        'from must be earlier than or equal to to',
      );
    }
    const records = this.getRecordsByDate();
    const data: FlightHourRecord[] = [];
    for (
      let timestamp = this.toTimestamp(from);
      timestamp <= this.toTimestamp(to);
      timestamp += 24 * 60 * 60 * 1000
    ) {
      const date = this.toDateString(timestamp);
      data.push({
        date,
        hours: records.get(date) ?? 0,
      });
    }
    return { from, to, data };
  }
  getSummary(range: string = '1w') {
    if (!VALID_RANGES.includes(range as ChartRange)) {
      throw new BadRequestException(
        'range must be one of: 1w, 1m, 3m, 6m, 1y',
      );
    }
    const selectedRange = range as ChartRange;
    const source = this.mockDataService.getFlightHoursData();
    const bounds = source.chartBounds[
      selectedRange
    ] as ChartBound;
    const records = this.getRecordsByDate();
    const referenceTimestamp = this.toTimestamp(REFERENCE_DATE);
    const displayDays = bounds.displayRangeDays;
    const chartDates: string[] = [];
    for (
      let offset = -displayDays;
      offset <= displayDays;
      offset++
    ) {
      chartDates.push(
        this.toDateString(
          referenceTimestamp + offset * 24 * 60 * 60 * 1000,
        ),
      );
    }
    const chart = this.rollingWindowBluffing(
      chartDates,
      bounds.windowDays,
      records,
    );
    const limits = source.limits as {
      daily: number;
      weekly: number;
      monthly: number;
      annual: number;
    };
    const cards = [
      {
        key: 'daily',
        label: 'Daily',
        hours: records.get(REFERENCE_DATE) ?? 0,
        limit: limits.daily,
        windowDays: 1,
      },
      {
        key: 'weekly',
        label: 'Weekly',
        hours: this.sumWindow(
          REFERENCE_DATE,
          7,
          records,
        ),
        limit: limits.weekly,
        windowDays: 7,
      },
      {
        key: 'monthly',
        label: 'Monthly',
        hours: this.sumWindow(
          REFERENCE_DATE,
          30,
          records,
        ),
        limit: limits.monthly,
        windowDays: 30,
      },
      {
        key: 'annual',
        label: 'Annual',
        hours: this.sumWindow(
          REFERENCE_DATE,
          365,
          records,
        ),
        limit: limits.annual,
        windowDays: 365,
      },
    ].map((card) => ({
      ...card,
      remaining: Math.max(0, card.limit - card.hours),
      exceeded: card.hours > card.limit,
      percentage: Number(
        ((card.hours / card.limit) * 100).toFixed(2),
      ),
    }));
    return {
      referenceDate: REFERENCE_DATE,
      range: selectedRange,
      summary: cards,
      chart: {
        windowDays: bounds.windowDays,
        limit: bounds.limit,
        yAxisMax: bounds.max,
        data: chart,
      },
    };
  }
  rollingWindowBluffing(dates: string[],windowDays: number,records: Map<string, number>,) {
    return dates.map((date) => ({
      date,
      hours: records.get(date) ?? 0,
      rollingSum: this.sumWindow(date, windowDays, records),
    }));
  }
  private sumWindow(endDate: string,windowDays: number,records: Map<string, number>,): number {
    const endTimestamp = this.toTimestamp(endDate);
    let total = 0;
    for (let offset = 0; offset < windowDays; offset++) {
      const date = this.toDateString(
        endTimestamp - offset * 24 * 60 * 60 * 1000,
      );
      total += records.get(date) ?? 0;
    }
    return Number(total.toFixed(2));
  }
  private getRecordsByDate(): Map<string, number> {
    const source = this.mockDataService.getFlightHoursData();
    const records = source.flightHours as FlightHourRecord[];
    return new Map(
      records.map((record) => [record.date, record.hours]),
    );
  }
  private validateDate(value: string, field: string): void {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!pattern.test(value)) {
      throw new BadRequestException(
        `${field} must use YYYY-MM-DD format`,
      );
    }
    const timestamp = Date.parse(`${value}T00:00:00.000Z`);
    if (
      Number.isNaN(timestamp) ||
      new Date(timestamp).toISOString().slice(0, 10) !== value
    ) {
      throw new BadRequestException(
        `${field} must be a valid calendar date`,
      );
    }
  }
  private toTimestamp(date: string): number {
    return Date.parse(`${date}T00:00:00.000Z`);
  }
  private toDateString(timestamp: number): string {
    return new Date(timestamp).toISOString().slice(0, 10);
  }
}
