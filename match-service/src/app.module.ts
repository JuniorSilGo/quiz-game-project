import { Module } from '@nestjs/common';
import { MatchModule } from './infrastructure/nest-modules/match.module';

@Module({
  imports: [MatchModule],
})
export class AppModule {}
