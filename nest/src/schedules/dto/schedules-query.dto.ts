import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class SchedulesQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(9999)
  year: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;
}
