import { Inject, Injectable } from '@nestjs/common';
import type { IStatisticsRepository } from '../../domain/repositories/statistics.repository.interface';
import { RankingResponseDto } from '../dto/ranking.dto';
import { UserStatsResponseDto } from '../dto/user-stats.dto';

@Injectable()
export class GetRankingUseCase {
  constructor(
    @Inject('IStatisticsRepository')
    private readonly repository: IStatisticsRepository
  ) {}

  async execute(): Promise<RankingResponseDto> {
    const rows = await this.repository.findAllOrderedByScore();

    const users = rows.map(
      (r) =>
        new UserStatsResponseDto({
          userId: Number(r.userId),
          score: Number(r.score),
          wins: Number(r.wins),
          matches: Number(r.matches),
        }),
    );

    return new RankingResponseDto(users);
  }
}
