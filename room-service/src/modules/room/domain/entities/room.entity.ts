export enum RoomStatus {
  WAITING = 'WAITING',
  READY = 'READY',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export class RoomEntity {
  public maxPlayers: number = 4;

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

  get currentPlayers(): number {
    return this.players.length;
  }

  canJoin(): boolean {
    return this.players.length < this.maxPlayers && this.status === RoomStatus.WAITING;
  }
}
