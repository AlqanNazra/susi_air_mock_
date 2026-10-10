
import { Module } from '@nestjs/common';
import { PilotController } from './pilot.controller.js';
import { PilotService } from './pilot.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { DataModule } from '../data/data.module.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';
@Module({
  imports: [AuthModule, DataModule],
  controllers: [PilotController],
  providers: [PilotService, JwtAuthGuard],
})
export class PilotModule {}
