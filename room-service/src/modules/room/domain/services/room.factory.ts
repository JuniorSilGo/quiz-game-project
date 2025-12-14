import { RoomEntity, RoomStatus } from '../entities/room.entity';
import { CreateRoomInput } from '../../application/dto/create-room.input';

export class RoomFactory {
  static create(data: CreateRoomInput): RoomEntity {
    if (!data.name) throw new Error('Entre com um nome válido para sala.');
    if (!data.topic) throw new Error('Entre com um assunto válido para sala.');
    if (!data.difficulty)
      throw new Error('Entre com uma dificuldade válida para sala.');
    if (!data.rounds || data.rounds <= 0)
      throw new Error('O número mínimo de rounds é 1.');
    if (data.maxPlayers && data.maxPlayers < 2)
      throw new Error('O número mínimo de jogadores é 2.');

    const room = new RoomEntity(
      null,
      data.name,
      data.topic,
      data.difficulty,
      data.rounds,
      data.createdById,
      data.players ?? [],
      RoomStatus.WAITING,
      null,
    );

    room.maxPlayers = data.maxPlayers ?? 4;

    return room;
  }
}
