import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RankingController } from './ranking/ranking.controller';
import { RankingService } from './ranking/ranking.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [RankingController],
  providers: [RankingService],
})
export class AppModule {}
