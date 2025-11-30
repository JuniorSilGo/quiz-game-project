import {Module} from '@nestjs/common';
import {MatchGrpcController} from '../grpc/controllers/match.grpc.controller';
import {MatchDomainService} from '../../domain/match/services/match-domain.service';
import {MATCH_REPOSITORY} from '../../domain/match/repositories/match.repository.port';
import {InMemoryMatchRepository} from '../persistence/in-memory/match.repository.in-memory.adapter';
import {CreateMatchUseCase} from '../../application/match/use-cases/create-match.use-case';
import {AnswerQuestionUseCase} from '../../application/match/use-cases/answer-question.use-case';
import {GetMatchStatusUseCase} from '../../application/match/use-cases/get-match-status.use-case';
import {GetMatchRankingUseCase} from '../../application/match/use-cases/get-match-ranking.use-case';
import {MatchTimerService} from "../../domain/match/services/match-timer.service";

@Module({
  controllers: [MatchGrpcController],
  providers: [
    MatchDomainService,
    MatchTimerService,
    {
      provide: MATCH_REPOSITORY,
      useClass: InMemoryMatchRepository,
    },
    CreateMatchUseCase,
    AnswerQuestionUseCase,
    GetMatchStatusUseCase,
    GetMatchRankingUseCase,
  ],
})
export class MatchModule {
}
