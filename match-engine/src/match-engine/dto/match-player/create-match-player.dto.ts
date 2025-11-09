import { IsInt, IsOptional, IsString, IsBoolean, IsDateString, Min } from 'class-validator';

export class CreateMatchPlayerDto {
  @IsInt()
  matchId: number;

  @IsInt()
  playerId: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  score?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  totalXp?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  correctAnswers?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  wrongAnswers?: number;

  @IsOptional()
  @IsDateString()
  leftAt?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
