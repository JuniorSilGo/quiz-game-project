import { UserStatsResponseDto } from './user-stats.dto';

export class RankingResponseDto {
  users: UserStatsResponseDto[];

  constructor(users: UserStatsResponseDto[] = []) {
    this.users = users;
  }
}
