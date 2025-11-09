import { IsInt, IsOptional, IsString, IsEnum, IsDateString, Min } from 'class-validator';
import { MatchStatus } from '@prisma/client';

export class UpdateMatchDto {
  @IsOptional()
  @IsString()
  externalId?: string;

  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  currentRound?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  totalRounds?: number;

  @IsOptional()
  @IsDateString()
  startedAt?: Date;

  @IsOptional()
  @IsDateString()
  endedAt?: Date;

  @IsOptional()
  @IsInt()
  timeLimitSec?: number;

  @IsOptional()
  @IsInt()
  createdBy?: number;
}
