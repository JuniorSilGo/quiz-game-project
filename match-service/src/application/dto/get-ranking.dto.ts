export interface GetRankingDto {
  roomName: string;
  userId: number;
}

export interface MatchRankingItemDto {
  userId: number;
  score: number;
}

export interface MatchRankingOutputDto {
  userRankings: MatchRankingItemDto[];
}
