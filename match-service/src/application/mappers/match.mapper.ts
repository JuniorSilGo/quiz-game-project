import type { Match } from "src/domain/entities/match.entity";
import type { CreatedMatchOutputDto } from "src/application/dto/create-match.dto";
import type { MatchStatusOutputDto } from "src/application/dto/get-status.dto";
import type { MatchRankingOutputDto } from "src/application/dto/get-ranking.dto";

const formatTimer = (roundEndsAt?: Date, now: Date = new Date()): string => {
  if (!roundEndsAt || roundEndsAt <= now) {
    return '00:00';
  }
  const diffMs = roundEndsAt.getTime() - now.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
};

export const toCreatedMatchOutputDTO = (match: Match): CreatedMatchOutputDto => ({
  roomName: match.roomName,
  currentRound: match.currentRound,
  totalRounds: match.questions.length,
  userPlayersIds: match.userPlayersIds,
  difficulty: match.difficulty,
  topic: match.topic,
});

export const toMatchStatusOutputDTO = (match: Match, now: Date = new Date()): MatchStatusOutputDto => {
  const currentIndex = match.currentRound - 1;
  const question = match.questions[currentIndex];
  const answeredSet = match.answeredByRound.get(match.currentRound) ?? new Set<number>();

  return {
    currentRound: match.currentRound,
    timer: formatTimer(match.roundEndsAt, now),
    difficulty: match.difficulty,
    topic: match.topic,
    question: question
      ? {
        statement: question.statement,
        alternatives: question.alternatives,
        userAnswerersIds: Array.from(answeredSet.values()),
      }
      : null,
  };
};

export const toMatchRankingOutputDTO = (match: Match): MatchRankingOutputDto => {
  const userRankings = Array.from(match.scores.entries())
    .map(([userId, score]) => ({userId, score}))
    .sort((a, b) => b.score - a.score);

  return {userRankings};
};
