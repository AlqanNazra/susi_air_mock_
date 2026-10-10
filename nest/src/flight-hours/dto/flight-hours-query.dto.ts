
import { IsDateString, Matches } from 'class-validator';

export class FlightHoursQueryDto {
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  from: string;

  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  to: string;
}
