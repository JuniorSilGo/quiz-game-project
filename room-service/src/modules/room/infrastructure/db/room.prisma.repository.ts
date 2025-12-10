import {
  CreateRoomRepoInput,
  RoomRepository,
} from '../../domain/repositories/room.repository.interface';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomPrismaRepository implements RoomRepository {
  constructor(private prisma: PrismaService) {}

  async createRoom(input: CreateRoomRepoInput) {
    return this.prisma.room.create({
      data: {
        name: input.name,
        topic: input.topic,
        difficulty: input.difficulty,
        rounds: input.rounds,
        createdById: input.createdById,
        players: {
          create: input.players.map((userId) => ({ userId })),
        },
      },
      include: {
        players: true,
      },
    });
  }

  async attachMatch(roomId: number, matchId: string) {
    await this.prisma.room.update({
      where: { id: roomId },
      data: { matchId },
    });
  }

  async findByName(name: string) {
    const r = await this.prisma.room.findUnique({
      where: { name },
      include: {
        players: { select: { userId: true } },
      },
    });

    if (!r) return null;

    return {
      id: r.id,
      name: r.name,
      topic: r.topic,
      difficulty: r.difficulty,
      rounds: r.rounds,
      createdById: r.createdById,
      players: r.players.map((p) => p.userId),
      currentRound: r.currentRound,
      totalRounds: r.totalRounds,
      matchId: r.matchId ?? null,
    };
  }

  async addPlayers(roomId: number, players: number[]) {
    await this.prisma.roomPlayer.createMany({
      data: players.map((id) => ({ roomId, userId: id })),
      skipDuplicates: true,
    });
  }

  async updateRoom(
    id: number,
    data: { currentRound?: number; totalRounds?: number },
  ): Promise<any> {
    return this.prisma.room.update({
      where: { id },
      data,
    });
  }
}
