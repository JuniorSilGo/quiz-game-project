import { Module } from '@nestjs/common';
import { StatisticsGrpcController } from '../grpc/controllers/statistics.controller';
import { GetUserStatsUseCase } from '../../application/use-cases/get-user-stats.usecase';
import { GetRankingUseCase } from '../../application/use-cases/get-ranking.usecase';
import { PrismaStatisticsRepository } from '../../domain/repositories/prisma-statistics.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../../../../protos/auth.proto'),
          url: '0.0.0.0:50056',
        },
      },
    ]),
  ],
  controllers: [StatisticsGrpcController],
  providers: [
    PrismaStatisticsRepository,
    GetUserStatsUseCase,
    GetRankingUseCase,
    {
      provide: 'IStatisticsRepository',
      useClass: PrismaStatisticsRepository,
    },
  ],
  exports: [GetUserStatsUseCase, GetRankingUseCase],
})
export class StatisticsModule {}
