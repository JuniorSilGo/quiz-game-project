import {Injectable} from '@nestjs/common';
import {Match} from 'src/domain/entities/match.entity';
import {MatchRepositoryPort} from 'src/domain/repositories/match.repository.port';

@Injectable()
export class InMemoryMatchRepository implements MatchRepositoryPort {
  private readonly matches = new Map<string, Match>();

  save(match: Match): void {
    this.matches.set(match.roomName, match);
  }

  findByRoomName(roomName: string): Match | null {
    return this.matches.get(roomName) ?? null;
  }

  delete(roomName: string): void {
    this.matches.delete(roomName);
  }

  exists(roomName: string): boolean {
    return this.matches.has(roomName);
  }

  getAll(): Match[] {
    return Array.from(this.matches.values());
  }
}
