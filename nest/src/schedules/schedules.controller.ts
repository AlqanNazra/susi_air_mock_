
import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';
import { SchedulesQueryDto } from './dto/schedules-query.dto.js';

@Controller('schedules')
@UseGuards(JwtAuthGuard)
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
  ) {}

  @Get()
  getSchedules(@Query() query: SchedulesQueryDto) {
    return this.schedulesService.getSchedules(
      String(query.year),
      String(query.month),
    );
  }
}
