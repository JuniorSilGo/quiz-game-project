export interface IStatisticsRepository {
  findByUserId(userId: number): Promise<any>;

  findAllOrderedByScore(limit?: number): Promise<any[]>;
  
  upsertUserStats(
    userId: number,
    data: { score?: number | bigint; wins?: number | bigint; matches?: number | bigint }
  ): Promise<any>;

  incrementStats(
    userId: number,
    scoreToAdd: number,
    won: boolean
  ): Promise<any>;
}
