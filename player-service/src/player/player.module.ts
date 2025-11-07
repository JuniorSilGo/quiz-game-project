import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerRepository } from './player.repository';
import { PlayerResolver } from '../graphql/player.resolver';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlayerController],
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
