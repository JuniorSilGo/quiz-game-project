import { Inject, Injectable } from '@nestjs/common';
import type { RoomRepository } from '../../domain/repositories/room.repository.interface';

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
    private readonly roomRepository: RoomRepository,
  ) {}

  // tipar o retorno posteriormente.
  async execute(input: JoinRoomInput) {
    const room = await this.roomRepository.findByName(input.roomName);

    if (!room) {
      throw new Error('Sala não encontrada!');
    }

    if (room.players.includes(input.userId)) {
      throw new Error('Usuário já está na sala.');
    }

    await this.roomRepository.addPlayers(room.id!, input.userId);

    const updatedRoom = await this.roomRepository.findByName(input.roomName);

    return updatedRoom;
  }
}
