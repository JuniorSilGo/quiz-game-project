import { RoomEntity } from '../entities/room.entity';
export interface RoomRepository {
  create(input: RoomEntity): Promise<RoomEntity>;

  findByName(name: string): Promise<RoomEntity | null>;

  findAvailable(): Promise<RoomEntity[]>;

  addPlayers(roomId: number, players: number): Promise<void>;

  attachMatch(roomId: number, matchId: string): Promise<void>;

  // updateRoom(
  //   roomId: number,
  //   data: Partial<{
  //     status: string;
  //     currentRound: number;
  //     totalRounds: number;
  //   }>,
  // ): Promise<void>;
}
