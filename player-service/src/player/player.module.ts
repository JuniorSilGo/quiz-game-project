import { Module } from '@nestjs/common';
import { PlayerGrpcController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerRepository } from './player.repository';
import { PlayerResolver } from '../graphql/player.resolver';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlayerGrpcController],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
    PlayerRepository,
    PlayerService,
    PlayerResolver,
  ],
  exports: [PlayerService],
})
export class PlayerModule {}
