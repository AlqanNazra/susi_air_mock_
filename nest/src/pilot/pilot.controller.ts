
import { Controller, Get, UseGuards } from '@nestjs/common';
import { PilotService } from './pilot.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';

@Controller('pilot')
@UseGuards(JwtAuthGuard)
export class PilotController {
  constructor(private readonly pilotService: PilotService) {}

  @Get('me')
  getProfile() {
    return this.pilotService.getProfile();
  }
}
