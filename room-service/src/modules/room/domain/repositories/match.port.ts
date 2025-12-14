export interface GeneratedQuestion {
  statement: string;
  alternatives: Record<string, string>;
  correctAnswer: string;
}

export interface CreateMatchInput {
  roomName: string;
  userId: number;
  questions: GeneratedQuestion[];
  userPlayersIds: number[];
  topic: string;
  difficulty: string;
}

export interface CreateMatchOutput {
  roomName: string;
  currentRound: number;
  totalRounds: number;
  userPlayersIds: number[];
  topic: string;
  difficulty: string;
}

export interface MatchPort {
  createMatch(input: CreateMatchInput): Promise<CreateMatchOutput>;
}
