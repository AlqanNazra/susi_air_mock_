
import { Module } from '@nestjs/common';
import { DataModule } from '../data/data.module.js';
import { SchedulesController } from './schedules.controller.js';
import { SchedulesService } from './schedules.service.js';
import { AuthModule } from '../auth/auth.module.js';
@Module({
  imports: [DataModule, AuthModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
