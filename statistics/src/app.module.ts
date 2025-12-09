import { Module } from '@nestjs/common';
import { StatisticsModule } from './infrastructure/modules/statistics.module';

@Module({
  imports: [StatisticsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
