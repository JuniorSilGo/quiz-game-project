import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StatisticsService } from './statistics.service';
import { GetUserStatusRequestDto } from './dto/statistics.dto';

@Controller()
export class StatisticsController {
  private readonly logger = new Logger(StatisticsController.name);

  constructor(private readonly service: StatisticsService) {}

  @GrpcMethod('StatisticsService', 'GetUserStats')
  async GetUserStats(data: { userId: number }, metadata: any): Promise<any> {
    this.logger.debug(`gRPC GetUserStats chamada para userId=${data.userId}`);
    const dto = await this.service.getUserStats(data.userId);
    return {
      userId: dto.userId,
      score: dto.score,
      wins: dto.wins,
      matches: dto.matches,
    };
  }

  @GrpcMethod('StatisticsService', 'GetRanking')
  async GetRanking(_: any, metadata: any): Promise<any> {
    this.logger.debug('gRPC GetRanking chamada');
    const ranking = await this.service.getRanking();
    return {
      users: ranking.users.map((u) => ({
        userId: u.userId,
        score: u.score,
        wins: u.wins,
        matches: u.matches,
      })),
    };
  }
}
