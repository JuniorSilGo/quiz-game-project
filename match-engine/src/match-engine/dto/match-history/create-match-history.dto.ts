import { IsInt, IsOptional, IsJSON, IsDateString } from 'class-validator';

export class CreateMatchHistoryDto {
  @IsInt()
  matchId: number;

  @IsInt()
  roomId: number;

  @IsOptional()
  @IsInt()
  winnerPlayerId?: number;

  @IsInt()
  totalRounds: number;

  @IsInt()
  totalPlayers: number;

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
