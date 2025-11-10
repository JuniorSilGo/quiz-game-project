import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaService } from '../../../database/prisma.service';

@Module({
  providers: [GameService, PrismaService],
  controllers: [GameController],
})
export class GameModule {}
