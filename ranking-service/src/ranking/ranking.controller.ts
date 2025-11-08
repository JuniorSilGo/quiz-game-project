import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RankingService } from './ranking.service';

@Controller()
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @GrpcMethod('RankingService', 'UpdateScore')
  async updateScore(data: { playerId: number; points: number }) {
    return this.rankingService.updateScore(data.playerId, data.points);
  }

  @GrpcMethod('RankingService', 'GetGlobalRanking')
  async getGlobalRanking(data: { limit?: number }) {
    const rankings = await this.rankingService.getGlobalRanking(data.limit || 10);
    return { rankings };
  }

  @GrpcMethod('RankingService', 'GetPlayerHistory')
  async getPlayerHistory(data: { playerId: number }) {
    const history = await this.rankingService.getPlayerHistory(data.playerId);
    return { history };
  }

  @GrpcMethod('RankingService', 'GetRank')
  async getRank(data: { playerId: number }) {
    return this.rankingService.getRank(data.playerId);
  }
}
