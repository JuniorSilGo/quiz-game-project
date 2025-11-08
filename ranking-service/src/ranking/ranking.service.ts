import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PrismaClient, Ranking, MatchHistory } from '../../generated/prisma';

@Injectable()
export class RankingService {
  private readonly prisma = new PrismaClient();
  private readonly logger = new Logger(RankingService.name);
  private readonly playerServiceUrl = 'http://localhost:3000/api/players';


  async updateScore(playerId: number, points: number): Promise<Ranking> {
    try {

      const { data: player } = await axios.get<{
        username: string;
        level: number;
      }>(`${this.playerServiceUrl}/${playerId}`);


      const updated = await this.prisma.ranking.upsert({
        where: { playerId },
        update: {
          score: { increment: points },
          level: player.level,
          username: player.username,
        },
        create: {
          playerId,
          username: player.username,
          level: player.level,
          score: points,
        },
      });

      const rankings = await this.prisma.ranking.findMany({
        orderBy: { score: 'desc' },
      });

      const position = rankings.findIndex((r) => r.playerId === playerId) + 1;

      await this.prisma.ranking.update({
        where: { playerId },
        data: { position },
      });


      await this.prisma.matchHistory.create({
        data: {
          playerId,
          result: points > 0 ? 'WIN' : 'LOSS',
          pointsDelta: points,
        },
      });

      this.logger.log(
        `🏆 ${player.username} ganhou ${points} pontos — posição #${position}`,
      );

      return updated;
    } catch (error: unknown) {
      const err = error as any;


      if ((axios as any).isAxiosError?.(err)) {
        this.logger.error(
          `Erro ao buscar jogador no PlayerService: ${err.message}`,
        );
      } else if (err instanceof Error) {
        this.logger.error(`Erro inesperado: ${err.message}`);
      } else {
        this.logger.error('Erro desconhecido ao atualizar score.');
      }

      throw error;
    }
  }


  async getGlobalRanking(limit = 10): Promise<Ranking[]> {
    return this.prisma.ranking.findMany({
      orderBy: { score: 'desc' },
      take: limit,
    });
  }


  async getPlayerHistory(playerId: number): Promise<MatchHistory[]> {
    return this.prisma.matchHistory.findMany({
      where: { playerId },
      orderBy: { createdAt: 'desc' },
    });
  }


  async getRank(
    playerId: number,
  ): Promise<{ position: number; score: number }> {
    const player = await this.prisma.ranking.findUnique({
      where: { playerId },
    });

    if (!player) throw new Error('Jogador não encontrado no ranking.');


    return {
      position: player.position ?? 0,
      score: player.score,
    };
  }
}
