import { Match } from '../entities/match.entity';

export const MATCH_PORT = 'MATCH_PORT';

export interface MatchRepositoryPort {
  save(match: Match): Promise<void> | void;
  findByRoomName(roomName: string): Promise<Match | null> | Match | null;
  delete(roomName: string): Promise<void> | void;
  exists(roomName: string): Promise<boolean> | boolean;
  getAll(): Match[];
}
