
import { Module } from '@nestjs/common';
import { MockDataService } from './mock-data/mock-data.service.js';

@Module({
  providers: [MockDataService],
  exports: [MockDataService],
})
export class DataModule {}
