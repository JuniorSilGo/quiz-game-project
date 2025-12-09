import { Inject, Injectable } from '@nestjs/common';
import type { IStatisticsRepository } from '../../domain/repositories/statistics.repository.interface';
import { UserStatsResponseDto } from '../dto/user-stats.dto';

@Injectable()
export class GetUserStatsUseCase {
  constructor(
    @Inject('IStatisticsRepository')
    private readonly repository: IStatisticsRepository
  ) {}

  async execute(userId: number): Promise<UserStatsResponseDto> {
    const record = await this.repository.findByUserId(userId);

    if (!record) {
      return new UserStatsResponseDto({
        userId,
        score: 0,
        wins: 0,
        matches: 0,
      });
    }

    return new UserStatsResponseDto({
      userId: Number(record.userId),
      score: Number(record.score),
      wins: Number(record.wins),
      matches: Number(record.matches),
    });
  }
}
