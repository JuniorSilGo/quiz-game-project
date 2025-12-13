import { RoomEntity } from '../../domain/entities/room.entity';
import { RoomRepository } from '../../domain/repositories/room.repository.interface';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { RoomStatus } from '../../domain/entities/room.entity';

@Injectable()
export class RoomPrismaRepository implements RoomRepository {
  constructor(private prisma: PrismaService) {}

  async create(room: RoomEntity): Promise<RoomEntity> {
    const createdRoom = await this.prisma.room.create({
      data: {
        name: room.name,
        topic: room.topic,
        difficulty: room.difficulty,
        rounds: room.rounds,
        createdById: room.createdById,
        players: {
          create: room.players.map((playerId) => ({ userId: playerId })),
        },
        status: room.status,
        matchId: room.matchId,
      },
      include: {
        players: true,
      },
    });

    const playersId: number[] = createdRoom.players.map(
      (player) => player.userId,
    );

    return new RoomEntity(
      createdRoom.id,
      createdRoom.name,
      createdRoom.topic,
      createdRoom.difficulty,
      createdRoom.rounds,
      createdRoom.createdById,
      playersId,
      createdRoom.status as RoomStatus, // se der alugum erro no status, tente isso aqui RoomStatus[createdRoom.status as keyof typeof RoomStatus]
      createdRoom.matchId,
    );
  }

  async findByName(name: string): Promise<RoomEntity | null> {
    const room = await this.prisma.room.findUnique({
      where: { name },
      include: {
        players: true,
      },
    });

    if (!room) return null;

    const playersId: number[] = room.players.map((player) => player.userId);

    return new RoomEntity(
      room.id,
      room.name,
      room.topic,
      room.difficulty,
      room.rounds,
      room.createdById,
      playersId,
      room.status as RoomStatus,
      room.matchId,
    );
  }

  async addPlayers(roomId: number, userId: number) {
    await this.prisma.roomPlayer.create({
      data: {
        roomId,
        userId,
      },
    });
  }

  async attachMatch(roomId: number, matchId: string) {
    await this.prisma.room.update({
      where: { id: roomId },
      data: { matchId },
    });
  }

  // async updateRoom(
  //   id: number,
  //   data: { currentRound?: number; totalRounds?: number },
  // ): Promise<any> {
  //   return this.prisma.room.update({
  //     where: { id },
  //     data,
  //   });
  // }
}
