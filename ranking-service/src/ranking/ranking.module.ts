import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../proto/auth.proto'),
          url: process.env.AUTH_GRPC_URL || 'localhost:50051', // porta do auth-service
        },
      },
    ]),
  ],
  controllers: [RankingController],
  providers: [RankingService, PrismaService],
})
export class RankingModule {}
