import { Injectable } from '@nestjs/common';
import { PrismaClient, Match, MatchPlayer, Round, MatchSnapshot, Prisma } from '@prisma/client';

@Injectable()
export class MatchEngineRepository {
  private prisma = new PrismaClient();

  async createMatch(data: Prisma.MatchCreateInput): Promise<Match> {
    return this.prisma.match.create({ data });
  }

  async getMatchByRoomId(roomId: number): Promise<Match | null> {
    return this.prisma.match.findFirst({ where: { roomId } });
  }

  async createPlayer(matchPlayer: Prisma.MatchPlayerCreateInput) {
    return this.prisma.matchPlayer.create({ data: matchPlayer });
  }

  async createRound(round: Prisma.RoundCreateInput | Prisma.RoundUncheckedCreateInput) {
    return this.prisma.round.create({ data: round });
  }
  async saveSnapshot(matchId: number, state: any): Promise<MatchSnapshot> {
    return this.prisma.matchSnapshot.create({
      data: {
        matchId,
        state,
        ttlAt: new Date(Date.now() + 60 * 1000), 
      },
    });
  }

  async getSnapshot(matchId: number): Promise<MatchSnapshot | null> {
    return this.prisma.matchSnapshot.findFirst({
      where: { matchId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
