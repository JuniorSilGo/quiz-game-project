import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MatchRepository {
  public prisma = new PrismaClient();

  async disconnect() {
    await this.prisma.$disconnect();
  }

  createMatch(data: any) {
    return this.prisma.match.create({ data });
  }

  updateMatch(matchId: number, data: any) {
    return this.prisma.match.update({
      where: { id: matchId },
      data,
    });
  }

  findMatchByRoomId(roomId: number) {
    return this.prisma.match.findFirst({
      where: { roomId },
    });
  }

  upsertMatchPlayer(matchId: number, playerId: number, data: any) {
    return this.prisma.matchPlayer.upsert({
      where: { matchId_playerId: { matchId, playerId } },
      create: { matchId, playerId, ...data },
      update: data,
    });
  }

  updateMatchPlayerScore(matchId: number, playerId: number, points: number) {
    return this.prisma.matchPlayer.update({
      where: { matchId_playerId: { matchId, playerId } },
      data: { score: { increment: points } },
    });
  }

  findMatchPlayers(matchId: number) {
    return this.prisma.matchPlayer.findMany({
      where: { matchId },
    });
  }

  createRound(data: any) {
    return this.prisma.round.create({ data });
  }

  findRoundById(roundId: number) {
    return this.prisma.round.findUnique({
      where: { id: roundId },
    });
  }

  createPlayerAnswer(data: any) {
    return this.prisma.playerAnswer.create({ data });
  }
}
