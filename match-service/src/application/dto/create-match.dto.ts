import { GeneratedQuestion } from '../../domain/entities/generated-question.vo';

export interface CreateMatchDto {
  roomName: string;
  userId: number;
  userPlayersIds: number[];
  questions: GeneratedQuestion[];
  difficulty: string;
  topic: string;
}

export interface CreatedMatchOutputDto {
  roomName: string;
  currentRound: number;
  totalRounds: number;
  userPlayersIds: number[];
  difficulty: string;
  topic: string;
}
