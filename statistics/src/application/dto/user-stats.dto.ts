export class GetUserStatsRequestDto {
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
