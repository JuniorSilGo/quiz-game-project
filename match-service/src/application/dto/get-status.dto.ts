export interface GetStatusDto {
  roomName: string;
  userId: number;
}

export interface MatchStatusOutputDto {
  currentRound: number;
  timer: string;
  difficulty: string;
  topic: string;
  question: {
    statement: string;
    alternatives: Record<string, string>;
    userAnswerersIds: number[];
  } | null;
}
