import { Injectable } from "@nestjs/common";
import { PrismaService } from "database/prisma.service";

@Injectable()
export class GameService {
    constructor(private readonly prisma: PrismaService) { }

    async trackMatchState(data: { matchId: string, status: string }) {
        const { matchId, status } = data
        return this.prisma.match.update({
            where: { id: matchId },
            data: { status },
        });
    }

  async saveMatchResult(matchId: string, results: { playerId: string; score: number }[]) {
    const scorePromises = results.map(r =>
      this.prisma.score.create({
        data: {
          matchId,
          playerId: r.playerId,
          score: r.score,
        },
      }),
    );
    await Promise.all(scorePromises);

    await this.prisma.match.update({
      where: { id: matchId },
      data: { status: 'FINISHED' },
    });

    return { success: true };
  }

    async listActiveMatches() {
        return this.prisma.match.findMany({ where: { status: "IN_PROGRESS" } });
    }

    async listFinishedMatches() {
        return this.prisma.match.findMany({ where: { status: "FINISHED" } });
    }
}
