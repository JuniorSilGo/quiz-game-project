import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {AnswerDto, AnswerOutputDto} from 'src/application/dto/answer.dto';
import {MATCH_PORT, type MatchRepositoryPort} from 'src/domain/repositories/match.repository.port';
import {
  advanceRound,
  getMatchOrThrow,
  MAX_POINTS,
  MIN_POINTS,
  ROUND_DURATION_MS,
} from './helpers/match.helpers';

@Injectable()
export class AnswerQuestionUseCase {
  constructor(
    @Inject(MATCH_PORT)
    private readonly repository: MatchRepositoryPort,
  ) {
  }

  async execute(input: AnswerDto): Promise<AnswerOutputDto> {
    const match = await getMatchOrThrow(this.repository, input.roomName);

    const totalQuestions = match.questions.length;
    if (match.currentRound > totalQuestions) {
      throw new BadRequestException('Não existem mais perguntas para responder');
    }

    const currentIndex = match.currentRound - 1;
    const question = match.questions[currentIndex];
    if (!question) {
      throw new BadRequestException('Não existe questão para responder');
    }

    let answeredSet = match.answeredByRound.get(match.currentRound);
    if (!answeredSet) {
      answeredSet = new Set<number>();
      match.answeredByRound.set(match.currentRound, answeredSet);
    }

    if (answeredSet.has(input.userId)) {
      return {isRight: question.correctAnswer === input.answer};
    }

    const isRight = question.correctAnswer === input.answer;

    if (isRight) {
      const now = Date.now();
      const end = match.roundEndsAt?.getTime() ?? now;
      const remaining = Math.max(end - now, 0);
      const factor = remaining / ROUND_DURATION_MS;
      const points = Math.floor(MIN_POINTS + (MAX_POINTS - MIN_POINTS) * factor);

      const prev = match.scores.get(input.userId) ?? 0;
      match.scores.set(input.userId, prev + points);
    }

    answeredSet.add(input.userId);

    const totalPlayers = match.userPlayersIds.length;
    const allAnswered = answeredSet.size >= totalPlayers;

    if (allAnswered) {
      advanceRound(match);
    }

    await Promise.resolve(this.repository.save(match));
    return {isRight};
  }
}
