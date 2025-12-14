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
          protoPath: join(process.cwd(), 'src/infrastructure/grpc/proto/auth.proto'),
          url: process.env.AUTH_GRPC_URL ?? '0.0.0.0:50051',
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
