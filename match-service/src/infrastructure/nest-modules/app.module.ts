import {Module} from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule';
import {CreateMatchUseCase} from '../../application/use-cases/create-match.use-case';
import {AnswerQuestionUseCase} from '../../application/use-cases/answer-question.use-case';
import {GetMatchStatusUseCase} from '../../application/use-cases/get-match-status.use-case';
import {GetMatchRankingUseCase} from '../../application/use-cases/get-match-ranking.use-case';
import {AdvanceExpiredRoundsUseCase} from '../../application/use-cases/advance-expired-rounds.use-case';
import {MatchGrpcController} from '../grpc/controllers/match.grpc.controller';
import {MATCH_PORT} from '../../domain/repositories/match.repository.port';
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
