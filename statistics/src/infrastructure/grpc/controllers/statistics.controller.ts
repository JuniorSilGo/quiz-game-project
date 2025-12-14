import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserStatsUseCase } from '../../../application/use-cases/get-user-stats.usecase';
import { GetRankingUseCase } from '../../../application/use-cases/get-ranking.usecase';
import { UpdateStatsUseCase } from '../../../application/use-cases/update-stats.usecase';

@Controller()
export class StatisticsGrpcController {
  constructor(
    private readonly getUserStats: GetUserStatsUseCase,
    private readonly getRanking: GetRankingUseCase,
    private readonly updateStats: UpdateStatsUseCase,
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

  @GrpcMethod('StatisticsService', 'UpdateStats')
  async updateStatsGrpc(data: { userId: number; scoreToAdd: number; won: boolean }) {
    const result = await this.updateStats.execute({
      userId: data.userId,
      scoreToAdd: data.scoreToAdd,
      won: data.won,
    });
    return result;
  }
}
