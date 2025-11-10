import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { AuthClientService } from '../auth/auth.client.service';
import { AuthGuard } from '../auth/auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../proto/auth.proto'),
          url: process.env.AUTH_GRPC_URL || 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [RankingController],
  providers: [RankingService, AuthClientService, AuthGuard],
})
export class RankingModule {}
