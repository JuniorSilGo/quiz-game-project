import { IsInt, IsOptional, Min } from 'class-validator';

export class GetUserStatusRequestDto {
  @IsInt()
  userId: number;
}

export class UserStatsResponseDto {
  userId: number;
  score: number;
  wins: number;
  matches: number;

  constructor(partial: Partial<UserStatsResponseDto>) {
    Object.assign(this, partial);
  }
}

export class RankingResponseDto {
  users: UserStatsResponseDto[];

  constructor(users: UserStatsResponseDto[] = []) {
    this.users = users;
  }
}
