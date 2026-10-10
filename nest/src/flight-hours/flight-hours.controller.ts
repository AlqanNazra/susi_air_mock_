
import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FlightHoursService } from './flight-hours.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';
import { FlightHoursQueryDto } from './dto/flight-hours-query.dto.js';
import { FlightHoursSummaryQueryDto } from './dto/flight-hours-summary-query.dto.js';

@Controller('flight-hours')
@UseGuards(JwtAuthGuard)
export class FlightHoursController {
  constructor(
    private readonly flightHoursService: FlightHoursService,
  ) {}

  @Get('summary')
  getSummary(@Query() query: FlightHoursSummaryQueryDto) {
    return this.flightHoursService.getSummary(query.range ?? '1w');
  }

  @Get()
  getFlightHours(@Query() query: FlightHoursQueryDto) {
    return this.flightHoursService.getFlightHours(
      query.from,
      query.to,
    );
  }
}
