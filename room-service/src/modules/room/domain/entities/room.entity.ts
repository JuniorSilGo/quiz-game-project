export enum RoomStatus {
  WAITING = 'WAITING',
  READY = 'READY',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export class RoomEntity {
  constructor(
    public readonly id: number | null,
    public name: string,
    public topic: string,
    public difficulty: string,
    public rounds: number,
    public createdById: number,
    public players: number[],
    public currentRound: number,
    public totalRounds: number,
    public status: RoomStatus,
    public matchId: string | null,
  ) {}
}
