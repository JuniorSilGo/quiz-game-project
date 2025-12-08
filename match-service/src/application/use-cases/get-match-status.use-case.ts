import {Inject, Injectable} from '@nestjs/common';
import {GetStatusDto, MatchStatusOutputDto} from '../dto/get-status.dto';
import {MATCH_PORT, type MatchRepositoryPort} from '../../domain/repositories/match.repository.port';
import {getMatchOrThrow} from './helpers/match.helpers';

@Injectable()
export class GetMatchStatusUseCase {
  constructor(
    @Inject(MATCH_PORT)
    private readonly repository: MatchRepositoryPort,
  ) {
  }

  async execute(input: GetStatusDto): Promise<MatchStatusOutputDto> {
    const match = await getMatchOrThrow(this.repository, input.roomName);
    const currentIndex = match.currentRound - 1;
    const question = match.questions[currentIndex];

    const answeredSet = match.answeredByRound.get(match.currentRound) ?? new Set<number>();
    const userAnswerersIds = Array.from(answeredSet.values());

    const now = new Date();
    let timer = '00:00';
    if (match.roundEndsAt && match.roundEndsAt > now) {
      const diffMs = match.roundEndsAt.getTime() - now.getTime();
      const seconds = Math.floor(diffMs / 1000);
      const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
      const ss = String(seconds % 60).padStart(2, '0');
      timer = `${mm}:${ss}`;
    }

    return {
      currentRound: match.currentRound,
      timer,
      difficulty: match.difficulty,
      topic: match.topic,
      question: question
        ? {
          statement: question.statement,
          alternatives: question.alternatives,
          userAnswerersIds,
        }
        : null,
    };
  }
}
