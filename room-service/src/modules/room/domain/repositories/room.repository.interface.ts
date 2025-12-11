import { RoomEntity } from '../entities/room.entity';

export interface CreateRoomRepoInput {
  name: string;
  topic: string;
  difficulty: string;
  rounds: number;
  createdById: number;
  players: number[];
}

export interface RoomRepository {
  createRoom(input: CreateRoomRepoInput): Promise<{ id: number }>;

  findByName(name: string): Promise<RoomEntity | null>;

  addPlayers(roomId: number, players: number[]): Promise<void>;

  attachMatch(roomId: number, matchId: string): Promise<void>;

  updateRoom(
    roomId: number,
    data: Partial<{
      status: string;
      currentRound: number;
      totalRounds: number;
    }>,
  ): Promise<void>;
}
