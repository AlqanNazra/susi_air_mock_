
import { Injectable } from '@nestjs/common';
import { MockDataService } from '../data/mock-data/mock-data.service.js';

@Injectable()
export class PilotService {
  constructor(private readonly mockDataService: MockDataService) {}

  getProfile() {
    const data = this.mockDataService.getFlightHoursData();

    return {
      name: data.pilot.name,
      totalFlightHours: data.pilot.totalFlightHours,
      avatarUrl: null,
    };
  }
}
