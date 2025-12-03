import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RankingService {
  private readonly prisma = new PrismaClient();
  private readonly logger = new Logger(RankingService.name);

  async updateScore(payload: { userId: string; points: number; username?: string }) {
    const { userId, points, username } = payload;

    if (!userId) throw new NotFoundException('userId é obrigatório');

    let ranking = await this.prisma.ranking.findUnique({ where: { userId } });

    if (ranking) {
      ranking = await this.prisma.ranking.update({
        where: { userId },
        data: {
          score: ranking.score + points,
          level: Math.floor((ranking.score + points) / 100) + 1,
          username: username ?? ranking.username,
        },
      });
    } else {
      ranking = await this.prisma.ranking.create({
        data: {
          userId,
          username: username ?? 'unknown',
          score: points,
          level: Math.floor(points / 100) + 1,
        },
      });
    }

    this.logger.log(`Score atualizado: ${ranking.username} (+${points})`);

    return {
      userId: ranking.userId,
      username: ranking.username,
      score: ranking.score,
      level: ranking.level,
      position: 0, // calculado depois
    };
  }

  // 🟡 Retorna posição e score do jogador (GetRank)
  async getRank(payload: { userId: string }) {
    const { userId } = payload;

    const ranking = await this.prisma.ranking.findUnique({ where: { userId } });
    if (!ranking) throw new NotFoundException('Ranking não encontrado');

    const higher = await this.prisma.ranking.count({
      where: { score: { gt: ranking.score } },
    });

    return {
      userId: ranking.userId,
      username: ranking.username,
      position: higher + 1,
      score: ranking.score,
      level: ranking.level,
    };
  }

  // 🔵 Retorna o ranking global (GetGlobalRanking)
  async getTopRankings(limit = 10) {
    const rankings = await this.prisma.ranking.findMany({
      take: limit,
      orderBy: { score: 'desc' },
    });

    return {
      rankings: rankings.map((r, index) => ({
        userId: r.userId,
        username: r.username,
        score: r.score,
        level: r.level,
        position: index + 1,
      })),
    };
  }

  // 🟣 Retorna histórico de partidas do jogador (mock)
  async getPlayerHistory(userId: string) {
    const ranking = await this.prisma.ranking.findUnique({ where: { userId } });
    if (!ranking) throw new NotFoundException('Jogador não encontrado');

    const history = [
      {
        result: 'Vitória',
        pointsDelta: +15,
        createdAt: new Date().toISOString(),
      },
      {
        result: 'Derrota',
        pointsDelta: -8,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];

    return { history };
  }
}
