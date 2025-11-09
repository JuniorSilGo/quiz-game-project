import { IsInt, IsOptional, IsJSON, IsDateString } from 'class-validator';

export class UpdateMatchHistoryDto {
  @IsOptional()
  @IsInt()
  winnerPlayerId?: number;

  @IsOptional()
  @IsDateString()
  startedAt?: Date;

  @IsOptional()
  @IsDateString()
  endedAt?: Date;

  @IsOptional()
  @IsJSON()
  summary?: any;
}
