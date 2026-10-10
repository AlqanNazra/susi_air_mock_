
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DataModule } from './data/data.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PilotModule } from './pilot/pilot.module.js';
import { FlightHoursModule } from './flight-hours/flight-hours.module.js';
import { DocumentsModule } from './documents/documents.module.js';
import { SchedulesModule } from './schedules/schedules.module.js';

@Module({
  imports: [
    DataModule,
    AuthModule,
    PilotModule,
    FlightHoursModule,
    DocumentsModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
