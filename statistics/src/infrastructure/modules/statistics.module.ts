import { Module } from '@nestjs/common';
import { StatisticsController } from '../grpc/controllers/statistics.controller';
import { StatisticsService } from '../../domain/services/statistics.service';
import { StatisticsRepository } from '../../domain/repositories/statistics.repository';
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
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsRepository],
  exports: [StatisticsService],
})
export class StatisticsModule {}
