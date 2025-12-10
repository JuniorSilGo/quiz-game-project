import { Inject, Injectable } from '@nestjs/common';
import * as roomRepositoryInterface from '../../domain/repositories/room.repository.interface';

export interface JoinRoomInput {
  roomName: string;
  userId: number;
}

export interface JoinRoomOutput {
  id: number;
  name: string;
  players: number[];
  topic: string;
  difficulty: string;
  rounds: number;
  matchId: string | null;
}

@Injectable()
export class JoinRoomUseCase {
  constructor(
    @Inject('RoomRepository')
    private readonly roomRepo: roomRepositoryInterface.RoomRepository,
  ) {}

  async execute(input: JoinRoomInput): Promise<JoinRoomOutput> {
    // 1 — Buscar sala
    const room = await this.roomRepo.findByName(input.roomName);
    if (!room) {
      throw new Error('Room not found');
    }

    // 2 — Adicionar player (domínio)
    room.addPlayer(input.userId);

    // 3 — Persistir player
    await this.roomRepo.addPlayers(room.id!, [input.userId]);

    // 4 — Retornar estado atualizado
    return {
      id: room.id!,
      name: room.name,
      players: room.players,
      topic: room.topic,
      difficulty: room.difficulty,
      rounds: room.rounds,
      matchId: room.matchId,
    };
  }
}
