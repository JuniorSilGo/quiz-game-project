import {Injectable} from '@nestjs/common';
import {MatchDomainService} from '../../../domain/match/services/match-domain.service';
import {AnswerDto, AnswerOutputDto} from '../dto/answer.dto';

@Injectable()
export class AnswerQuestionUseCase {
  constructor(private readonly domain: MatchDomainService) {
  }

  execute(input: AnswerDto): AnswerOutputDto {
    const isRight = this.domain.answer(input.roomName, input.userId, input.answer);
    return {isRight};
  }
}
