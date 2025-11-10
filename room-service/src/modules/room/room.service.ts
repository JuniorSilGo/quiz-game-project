import { Injectable, NotFoundException, Inject, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { ClientGrpc } from '@nestjs/microservices';
import { MatchEngineGrpcService } from '../room/match-engine.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RoomService implements OnModuleInit {
  private matchEngineService: MatchEngineGrpcService;

  constructor(
    private readonly prisma: PrismaService,
    @Inject('MATCH_ENGINE_CLIENT') private readonly client: ClientGrpc,
  ) { }

  onModuleInit() {
    this.matchEngineService = this.client.getService<MatchEngineGrpcService>('MatchEngineService');
  }

  async createRoom(data: { name: string; ownerId: string }) {
    return this.prisma.room.create({ data });
  }

  async listRooms() {
    return this.prisma.room.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getRooms() {
    return this.prisma.room.findMany({ include: { players: true } });
  }

  async joinRoom(data: { roomId: string; playerId: string; playerName: string }) {
    const { roomId, playerId, playerName } = data;

    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: { players: true },
    });

    if (!room) throw new NotFoundException(`Room ${data.roomId} not found`);

    let player = await this.prisma.player.findUnique({ where: { id: playerId } });

    if (!player) {
      player = await this.prisma.player.create({
        data: { id: playerId, name: playerName, roomId },
      });
    } else {
      player = await this.prisma.player.update({
        where: { id: playerId },
        data: { roomId },
      });
    }

    return this.prisma.room.findUnique({
      where: { id: roomId },
      include: { players: true },
    });
  }

  async leaveRoom(data: { roomId: string; playerId: string }) {
    const player = await this.prisma.player.findUnique({ where: { id: data.playerId } });
    if (!player) throw new NotFoundException(`Player ${data.playerId} not found`);

    await this.prisma.player.update({
      where: { id: data.playerId },
      data: { roomId: null },
    });

    return this.prisma.room.findUnique({
      where: { id: data.roomId },
      include: { players: true },
    });
  }

  async listPlayers(roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: { players: true },
    });

    if (!room) throw new NotFoundException(`Room with id ${roomId} not found`);

    return { players: room.players };
  }

  async notifyMatchStart(roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: { players: true },
    });

    if (!room) throw new NotFoundException(`Room with id ${roomId} not found`);

    return {
      message: `Match started for room ${room.name}`,
      roomId: room.id,
      players: room.players,
    };
  }

  async updateStatus(roomId: string, status: 'waiting' | 'in-progress' | 'finished') {
    return this.prisma.room.update({ where: { id: roomId }, data: { status } });
  }

  async createMatch(roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: { players: true },
    });

    if (!room) throw new NotFoundException(`Room ${roomId} not found`);

    // Extrai IDs dos jogadores
    const playerIds = room.players.map(p => p.id);

    // Chama gRPC do MatchEngine
    const result = await firstValueFrom(
      this.matchEngineService.createMatch({
        roomId,
        players: playerIds,
      }),
    );

    // Atualiza status da sala
    await this.prisma.room.update({
      where: { id: roomId },
      data: { status: "in-progress" },
    });

    return {
      roomId,
      matchId: result.matchId,
      status: result.status,
    };
  }
}
