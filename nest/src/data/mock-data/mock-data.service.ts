

import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


@Injectable()
export class MockDataService implements OnModuleInit {
  private readonly logger = new Logger(MockDataService.name);
  private flightHoursData: any;
  private documentsData: any;
  private schedulesData: any;
  onModuleInit(): void {
    try {
      const dataDirectory = join(__dirname, '..');

      this.flightHoursData = JSON.parse(
        readFileSync(
          join(dataDirectory, 'mock-flight-hours.json'),
          'utf-8',
        ),
      );

      this.documentsData = JSON.parse(
        readFileSync(
          join(dataDirectory, 'mock-documents.json'),
          'utf-8',
        ),
      );

      this.schedulesData = JSON.parse(
        readFileSync(
          join(dataDirectory, 'mock-schedules.json'),
          'utf-8',
        ),
      );

      this.logger.log('Flight hours data loaded');
      this.logger.log('Documents data loaded');
      this.logger.log('Schedules data loaded');
    } catch (error) {
      this.logger.error('Failed to load mock JSON data', error);
      throw new InternalServerErrorException(
        'Failed to initialize mock data',
      );
    }
  }
  getFlightHoursData() {return this.flightHoursData;}
  getDocumentsData() {return this.documentsData;}
  getSchedulesData() {return this.schedulesData;}
}
