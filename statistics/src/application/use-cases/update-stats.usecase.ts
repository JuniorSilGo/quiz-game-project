import { Inject, Injectable } from '@nestjs/common';
import type { IStatisticsRepository } from '../../domain/repositories/statistics.repository.interface';

export interface UpdateStatsInput {
  userId: number;
  scoreToAdd: number;
  won: boolean;
}

@Injectable()
export class UpdateStatsUseCase {
  constructor(
    @Inject('IStatisticsRepository')
    private readonly statisticsRepository: IStatisticsRepository,
  ) {}

  async execute(input: UpdateStatsInput) {
    const updated = await this.statisticsRepository.incrementStats(
      input.userId,
      input.scoreToAdd,
      input.won,
    );

    return {
      userId: updated.userId,
      score: updated.score,
      wins: updated.wins,
      matches: updated.matches,
    };
  }
}
