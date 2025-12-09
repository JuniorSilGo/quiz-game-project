import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserStatsUseCase } from '../../../application/use-cases/get-user-stats.usecase';
import { GetRankingUseCase } from '../../../application/use-cases/get-ranking.usecase';

@Controller()
export class StatisticsGrpcController {
  constructor(
    private readonly getUserStats: GetUserStatsUseCase,
    private readonly getRanking: GetRankingUseCase,
  ) {}

  @GrpcMethod('StatisticsService', 'GetUserStats')
  async getUser(data: { userId: number }) {
    const dto = await this.getUserStats.execute(data.userId);
    return dto;
  }

  @GrpcMethod('StatisticsService', 'GetRanking')
  async getRankingGrpc() {
    const result = await this.getRanking.execute();
    return result;
  }
}
