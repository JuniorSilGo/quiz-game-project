import {Module} from '@nestjs/common';
import {MatchGrpcController} from '../grpc/controllers/match.grpc.controller';
import {MatchDomainService} from '../../domain/services/match-domain.service';
import {MATCH_REPOSITORY} from '../../domain/repositories/match.repository.port';
import {InMemoryMatchRepository} from '../persistence/in-memory/match.repository.in-memory.adapter';
import {CreateMatchUseCase} from '../../application/use-cases/create-match.use-case';
import {AnswerQuestionUseCase} from '../../application/use-cases/answer-question.use-case';
import {GetMatchStatusUseCase} from '../../application/use-cases/get-match-status.use-case';
import {GetMatchRankingUseCase} from '../../application/use-cases/get-match-ranking.use-case';
import {MatchTimerService} from "../../domain/services/match-timer.service";

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
