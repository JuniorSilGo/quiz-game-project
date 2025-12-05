import {Controller} from '@nestjs/common';
import {GrpcMethod} from '@nestjs/microservices';
import {CreateMatchUseCase} from '../../../application/use-cases/create-match.use-case';
import {AnswerQuestionUseCase} from '../../../application/use-cases/answer-question.use-case';
import {GetMatchStatusUseCase} from '../../../application/use-cases/get-match-status.use-case';
import {GetMatchRankingUseCase} from '../../../application/use-cases/get-match-ranking.use-case';
import * as createMatchDto from '../../../application/dto/create-match.dto';
import * as answerDto from '../../../application/dto/answer.dto';
import * as getStatusDto from '../../../application/dto/get-status.dto';
import * as getRankingDto from '../../../application/dto/get-ranking.dto';

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
  createMatch(payload: createMatchDto.CreateMatchDto) {
    return this.createMatchUseCase.execute(payload);
  }

  @GrpcMethod('MatchService', 'Answer')
  answer(payload: answerDto.AnswerDto) {
    return this.answerQuestionUseCase.execute(payload);
  }

  @GrpcMethod('MatchService', 'GetMatchStatus')
  getMatchStatus(payload: getStatusDto.GetStatusDto) {
    return this.getMatchStatusUseCase.execute(payload);
  }

  @GrpcMethod('MatchService', 'GetMatchRanking')
  getMatchRanking(payload: getRankingDto.GetRankingDto) {
    return this.getMatchRankingUseCase.execute(payload);
  }
}
