import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchEngineModule } from './match-engine/match-engine.module';

@Module({
  imports: [MatchEngineModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
