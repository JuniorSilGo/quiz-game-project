import {BadRequestException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Match} from '../entities/match.entity';
import {GeneratedQuestion} from '../entities/generated-question.vo';
import * as matchRepositoryPort from '../repositories/match.repository.port';

const ROUND_DURATION_MS = 30000;
const MIN_POINTS = 100
const MAX_POINTS = 250

@Injectable()
export class MatchDomainService {
  constructor(
    @Inject(matchRepositoryPort.MATCH_REPOSITORY)
    private readonly repository: matchRepositoryPort.MatchRepositoryPort,
  ) {
  }

  createMatch(input: {
    roomName: string;
    userId: number;
    userPlayersIds: number[];
    questions: GeneratedQuestion[];
    difficulty: string;
    topic: string;
  }): Match {
    const exists = this.repository.exists(input.roomName);
    if (exists) {
      throw new BadRequestException('Uma partida para essa sala já existe');
    }

    const match = new Match(
      input.roomName,
      input.userId,
      input.userPlayersIds,
      input.questions,
      input.difficulty,
      input.topic,
      1,
    );

    input.userPlayersIds.forEach((id) => match.scores.set(id, 0));

    match.roundEndsAt = new Date(Date.now() + ROUND_DURATION_MS);

    this.repository.save(match);
    return match;
  }

  private getMatchOrThrow(roomName: string): Match {
    const found = this.repository.findByRoomName(roomName);
    const match = found instanceof Promise ? null : found;
    if (!match) {
      throw new NotFoundException(`Partida para a sala "${roomName}" não encontrada`);
    }
    return match;
  }

  forceAdvanceRound(match: Match) {
    const currentIndex = match.currentRound - 1;

    // remove questão anterior
    match.questions[currentIndex] = undefined as any;

    // avança round
    match.currentRound++;

    if (match.currentRound > match.questions.length) {
      return;
    }

    // zera respondedores
    match.answeredByRound.set(match.currentRound, new Set());

    // reinicia timer
    match.roundEndsAt = new Date(Date.now() + ROUND_DURATION_MS);
  }

  answer(roomName: string, userId: number, answer: string): boolean {
    const match = this.getMatchOrThrow(roomName);

    // Se não tiver mais perguntas → erro
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

    if (answeredSet.has(userId)) {
      return question.correctAnswer === answer;
    }

    const isRight = question.correctAnswer === answer;

    if (isRight) {
      // cálculo de velocidade
      const now = Date.now();
      const end = match.roundEndsAt?.getTime() ?? now;

      const remaining = Math.max(end - now, 0);
      const factor = remaining / ROUND_DURATION_MS;

      const points = Math.floor(MIN_POINTS + (MAX_POINTS - MIN_POINTS) * factor);

      const prev = match.scores.get(userId) ?? 0;
      match.scores.set(userId, prev + points);
    }

    answeredSet.add(userId);

    // Se todos responderam → avançar round
    const totalPlayers = match.userPlayersIds.length;
    const allAnswered = answeredSet.size >= totalPlayers;

    if (allAnswered) {
      // remover pergunta anterior
      match.questions[currentIndex] = undefined as any;

      match.currentRound++;

      if (match.currentRound <= match.questions.length) {
        match.answeredByRound.set(match.currentRound, new Set());
        match.roundEndsAt = new Date(Date.now() + ROUND_DURATION_MS);
      }
    }

    this.repository.save(match);
    return isRight;
  }


  getStatus(roomName: string, userId: number) {
    const match = this.getMatchOrThrow(roomName);
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

  getRanking(roomName: string) {
    const match = this.getMatchOrThrow(roomName);

    return Array.from(match.scores.entries())
    .map(([userId, score]) => ({userId, score}))
    .sort((a, b) => b.score - a.score);
  }
}
