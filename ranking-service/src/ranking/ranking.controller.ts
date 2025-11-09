import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RankingService } from './ranking.service';

@Controller()
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @GrpcMethod('RankingService', 'UpdateScore')
  updateScore(data: { token: string; points: number }) {
    return this.rankingService.updateScore(data);
  }

  @GrpcMethod('RankingService', 'GetRank')
  getRank(data: { playerId: number }) {
    return this.rankingService.getRank(data.playerId);
  }

  @GrpcMethod('RankingService', 'GetGlobalRanking')
  getGlobalRanking(data: { limit: number }) {
    return this.rankingService.getGlobalRanking(data.limit || 10);
  }

  @GrpcMethod('RankingService', 'GetPlayerHistory')
  getPlayerHistory(data: { playerId: number }) {
    return this.rankingService.getPlayerHistory(data.playerId);
  }
}
