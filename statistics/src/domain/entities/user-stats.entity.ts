export class UserStats {
  constructor(
    public readonly userId: number,
    public readonly score: number,
    public readonly wins: number,
    public readonly matches: number,
  ) {}
}
