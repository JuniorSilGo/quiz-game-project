import { GeneratedQuestion } from './questions.port';

export interface CreateMatchInput {
  userId: number;
  questions: GeneratedQuestion[];
  userPlayersIds: number[];
  topic: string;
  difficulty: string;
}

export interface CreateMatchOutput {
  matchId: string | null;
  currentRound: number;
  totalRounds: number;
  userPlayersIds: number[];
  topic: string;
  difficulty: string;
}

export interface MatchPort {
  createMatch(input: CreateMatchInput): Promise<CreateMatchOutput>;
}
