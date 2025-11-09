export interface RankingServiceClient {
  updateScores(data: { playerId: number; points: number }): Promise<any>;
  batchUpdate(data: { updates: Array<{ playerId:number; points:number }> }): Promise<any>;
}
