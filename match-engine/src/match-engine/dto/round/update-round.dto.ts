import { IsInt, IsOptional, IsDateString, IsJSON, Min } from 'class-validator';

export class UpdateRoundDto {
  @IsOptional()
  @IsInt()
  questionId?: number;

  @IsOptional()
  @IsDateString()
  startedAt?: Date;

  @IsOptional()
  @IsDateString()
  endedAt?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  timeLimitSec?: number;

  @IsOptional()
  @IsInt()
  correctAnswerId?: number;

  @IsOptional()
  @IsJSON()
  roundResult?: any;
}
