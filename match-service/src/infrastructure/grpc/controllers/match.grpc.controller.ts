import {Controller} from '@nestjs/common';
import {GrpcMethod} from '@nestjs/microservices';
import type { AnswerDto } from 'src/application/dto/answer.dto';
import type { CreateMatchDto } from 'src/application/dto/create-match.dto';
import type { GetRankingDto } from 'src/application/dto/get-ranking.dto';
import type { GetStatusDto } from 'src/application/dto/get-status.dto';
import { AnswerQuestionUseCase } from 'src/application/use-cases/answer-question.use-case';
import { CreateMatchUseCase } from 'src/application/use-cases/create-match.use-case';
import { GetMatchRankingUseCase } from 'src/application/use-cases/get-match-ranking.use-case';
import { GetMatchStatusUseCase } from 'src/application/use-cases/get-match-status.use-case';

@Controller()
export class MatchGrpcController {
  constructor(
    private readonly createMatchUseCase: CreateMatchUseCase,
    private readonly answerQuestionUseCase: AnswerQuestionUseCase,
    private readonly getMatchStatusUseCase: GetMatchStatusUseCase,
    private readonly getMatchRankingUseCase: GetMatchRankingUseCase,
  ) {
  }

  @GrpcMethod('MatchService', 'CreateMatch')
  createMatch(payload: CreateMatchDto) {
    return this.createMatchUseCase.execute(payload);
  }

  @GrpcMethod('MatchService', 'Answer')
  answer(payload: AnswerDto) {
    return this.answerQuestionUseCase.execute(payload);
  }

  @GrpcMethod('MatchService', 'GetMatchStatus')
  getMatchStatus(payload: GetStatusDto) {
    return this.getMatchStatusUseCase.execute(payload);
  }

  @GrpcMethod('MatchService', 'GetMatchRanking')
  getMatchRanking(payload: GetRankingDto) {
    return this.getMatchRankingUseCase.execute(payload);
  }
}
