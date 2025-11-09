import { Injectable } from '@nestjs/common';

export interface StartMatchDto {
  roomId: number;
}

export interface SubmitAnswerDto {
  matchId: number;
  playerId: number;
  answerId: number;
}

export interface GetStateDto {
  matchId: number;
}

export interface PlayerInfo {
  playerId: number;
  username: string;
  avatar: string;
  score: number;
}

export interface RoundInfo {
  index: number;
  questionId: number;
  correctAnswerId: number;
}

@Injectable()
export class MatchEngineService {
  startMatch(dto: StartMatchDto) {
    return {
      matchId: 1,
      status: 'RUNNING',
      totalRounds: 3,
      players: [
        { playerId: 1, username: 'Player1', avatar: '', score: 0 },
        { playerId: 2, username: 'Player2', avatar: '', score: 0 },
      ] as PlayerInfo[],
    };
  }

  submitAnswer(dto: SubmitAnswerDto) {
    return {
      success: true,
      message: 'Resposta registrada',
      score: Math.floor(Math.random() * 10), 
    };
  }

  getState(dto: GetStateDto) {
    return {
      matchId: 1,
      status: 'RUNNING',
      currentRound: 1,
      totalRounds: 3,
      rounds: [
        { index: 1, questionId: 101, correctAnswerId: 2 },
        { index: 2, questionId: 102, correctAnswerId: 1 },
        { index: 3, questionId: 103, correctAnswerId: 3 },
      ] as RoundInfo[],
      players: [
        { playerId: 1, username: 'Player1', avatar: '', score: 5 },
        { playerId: 2, username: 'Player2', avatar: '', score: 3 },
      ] as PlayerInfo[],
    };
  }
}
