export interface StatsStrategy {
  calculateScore(base: number, delta: number): number;
}

export class DefaultStatsStrategy implements StatsStrategy {
  calculateScore(base: number, delta: number): number {
    return base + delta;
  }
}
