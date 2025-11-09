import { Module } from '@nestjs/common';
import { MatchEngineController } from './match-engine.controller';
import { MatchEngineService } from './match-engine.service';
import { MatchEngineRepository } from './match-engine.repository';

@Module({
  imports: [],
  controllers: [MatchEngineController],
  providers: [MatchEngineService, MatchEngineRepository],
})
export class MatchEngineModule {}
