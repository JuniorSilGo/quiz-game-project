import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RankingService } from './ranking.service';

@Controller()
export class RankingController { 
  private readonly logger = new Logger(RankingController.name);

  constructor(private readonly rankingService: RankingService) {}

  @GrpcMethod('RankingService', 'UpdateScore')
  async updateScore(data: { userId: string; points: number; username?: string }) {
    this.logger.log(`Recebido UpdateScore: userId=${data.userId}, points=${data.points}`);
    return this.rankingService.updateScore(data);
  }

  @GrpcMethod('RankingService', 'GetRank')
  async getRank(data: { userId: string }) {
    this.logger.log(`Recebido GetRank: userId=${data.userId}`);
    return this.rankingService.getRank(data);
  }

  @GrpcMethod('RankingService', 'GetGlobalRanking')
  async getGlobalRanking(data: { limit?: number }) {
    this.logger.log(`Recebido GetGlobalRanking: limit=${data.limit ?? 10}`);
    return this.rankingService.getTopRankings(data.limit ?? 10);
  }

  @GrpcMethod('RankingService', 'GetPlayerHistory')
  async getPlayerHistory(data: { userId: string }) {
    this.logger.log(`Recebido GetPlayerHistory: userId=${data.userId}`);
    return this.rankingService.getPlayerHistory(data.userId);
  }
}
