import {NotFoundException} from '@nestjs/common';
import {Match} from '../../../domain/entities/match.entity';
import type {MatchRepositoryPort} from '../../../domain/repositories/match.repository.port';

export const ROUND_DURATION_MS = 30000;
export const MIN_POINTS = 100;
export const MAX_POINTS = 250;

export async function getMatchOrThrow(
  repository: MatchRepositoryPort,
  roomName: string,
): Promise<Match> {
  const found = await Promise.resolve(repository.findByRoomName(roomName));

  if (!found) {
    throw new NotFoundException(`Partida para a sala "${roomName}" não encontrada`);
  }

  return found;
}

export function advanceRound(match: Match): void {
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
