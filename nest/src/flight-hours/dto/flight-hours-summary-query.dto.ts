
import { IsIn, IsOptional, IsString } from 'class-validator';

export class FlightHoursSummaryQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(['1w', '1m', '3m', '6m', '1y'])
  range?: string;
}
