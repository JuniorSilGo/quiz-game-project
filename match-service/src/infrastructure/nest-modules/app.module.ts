import {Module} from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule';
import {CreateMatchUseCase} from 'src/application/use-cases/create-match.use-case';
import {AnswerQuestionUseCase} from 'src/application/use-cases/answer-question.use-case';
import {GetMatchStatusUseCase} from 'src/application/use-cases/get-match-status.use-case';
import {GetMatchRankingUseCase} from 'src/application/use-cases/get-match-ranking.use-case';
import {AdvanceExpiredRoundsUseCase} from 'src/application/use-cases/advance-expired-rounds.use-case';
import {MatchGrpcController} from '../grpc/controllers/match.grpc.controller';
import {MATCH_PORT} from 'src/domain/repositories/match.repository.port';
import {InMemoryMatchRepository} from '../persistence/in-memory/match.repository.in-memory.adapter';
import {MatchTimerService} from '../services/match-timer.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [MatchGrpcController],
  providers: [
    {
      provide: MATCH_PORT,
      useClass: InMemoryMatchRepository,
    },
    MatchTimerService,
    AdvanceExpiredRoundsUseCase,
    CreateMatchUseCase,
    AnswerQuestionUseCase,
    GetMatchStatusUseCase,
    GetMatchRankingUseCase,
  ],
})
export class AppModule {
}
