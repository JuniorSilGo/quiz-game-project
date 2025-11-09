import { IsInt, IsOptional, IsBoolean, IsDateString, Min } from 'class-validator';

export class CreatePlayerAnswerDto {
  @IsInt()
  roundId: number;

  @IsInt()
  matchPlayerId: number;

  @IsInt()
  playerId: number;

  @IsInt()
  answerId: number;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  timeMs?: number;

  @IsOptional()
  @IsInt()
  pointsAwarded?: number;
}
