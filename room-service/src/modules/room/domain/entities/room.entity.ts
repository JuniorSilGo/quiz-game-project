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
    public createdById: number, // equivale ao userOwnerId do proto
    public players: number[], // equivale ao userPlayersId do proto
    public status: RoomStatus,
    public matchId: string | null,
  ) {}
}
