import { RoomEntity, RoomStatus } from '../entities/room.entity';

export interface CreateRoomProps {
  name: string;
  topic: string;
  difficulty: string;
  rounds: number;
  createdById: number;
  players?: number[];
}

export class RoomFactory {
  static createRoom(props: CreateRoomProps): RoomEntity {
    // --- 1. Validações básicas ---
    if (!props.name) throw new Error('Room name is required.');
    if (!props.topic) throw new Error('Topic is required.');
    if (!props.difficulty) throw new Error('Difficulty is required.');
    if (!props.rounds || props.rounds <= 0)
      throw new Error('Rounds must be greater than zero.');

    // --- 2. Garantir que o criador sempre está na lista ---
    const players = new Set<number>([
      props.createdById,
      ...(props.players ?? []),
    ]);

    // --- 3. Criar entidade com estado inicial ---
    return new RoomEntity(
      null, // ID ainda não existe
      props.name,
      props.topic,
      props.difficulty,
      props.rounds,
      props.createdById,
      Array.from(players), // converte Set -> array
      0, // currentRound inicial
      props.rounds, // totalRounds igual a rounds
      RoomStatus.WAITING, // status inicial
      null, // matchId ainda não existe
    );
  }
}
