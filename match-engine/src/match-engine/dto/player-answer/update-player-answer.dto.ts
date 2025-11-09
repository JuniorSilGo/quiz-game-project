import { IsInt, IsOptional, IsBoolean, Min } from 'class-validator';

export class UpdatePlayerAnswerDto {
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
