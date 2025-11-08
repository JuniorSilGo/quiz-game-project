import { IsNotEmpty, IsOptional, IsString, IsEmail, IsInt, Min } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsString()
  avatar?: string | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  level?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(0)
  xp?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  wins?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  matchesPlayed?: number;
}
