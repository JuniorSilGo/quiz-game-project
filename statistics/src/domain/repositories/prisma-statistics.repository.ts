import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IStatisticsRepository } from '../../domain/repositories/statistics.repository.interface';
import { UserStats } from '../../domain/entities/user-stats.entity';

@Injectable()
export class PrismaStatisticsRepository
  implements IStatisticsRepository, OnModuleDestroy
{
  private prisma = new PrismaClient();

  async findByUserId(userId: number): Promise<UserStats | null> {
    const data = await this.prisma.userStats.findUnique({
      where: { userId },
    });

    if (!data) return null;

    return new UserStats(
      Number(data.userId),
      Number(data.score),
      Number(data.wins),
      Number(data.matches),
    );
  }

  async findAllOrderedByScore(): Promise<UserStats[]> {
    const rows = await this.prisma.userStats.findMany({
      orderBy: { score: 'desc' },
    });

    return rows.map(
      (r) =>
        new UserStats(
          Number(r.userId),
          Number(r.score),
          Number(r.wins),
          Number(r.matches),
        )
    );
  }

  async upsertUserStats(
    userId: number,
    data: {
      score?: number | bigint;
      wins?: number | bigint;
      matches?: number | bigint;
    }
  ): Promise<void> {
    await this.prisma.userStats.upsert({
      where: { userId },
      create: {
        userId,
        score: BigInt(data.score ?? 0),
        wins: BigInt(data.wins ?? 0),
        matches: BigInt(data.matches ?? 0),
      },
      update: {
        score: data.score !== undefined ? BigInt(data.score) : undefined,
        wins: data.wins !== undefined ? BigInt(data.wins) : undefined,
        matches: data.matches !== undefined ? BigInt(data.matches) : undefined,
      },
    });
  }

  async incrementStats(
    userId: number,
    scoreToAdd: number,
    won: boolean
  ): Promise<UserStats> {
    // Primeiro verifica se existe, se não, cria
    const existing = await this.prisma.userStats.findUnique({
      where: { userId },
    });

    if (!existing) {
      const created = await this.prisma.userStats.create({
        data: {
          userId,
          score: BigInt(scoreToAdd),
          wins: BigInt(won ? 1 : 0),
          matches: BigInt(1),
        },
      });
      return new UserStats(
        Number(created.userId),
        Number(created.score),
        Number(created.wins),
        Number(created.matches),
      );
    }

    // Incrementa os valores
    const updated = await this.prisma.userStats.update({
      where: { userId },
      data: {
        score: { increment: scoreToAdd },
        wins: won ? { increment: 1 } : undefined,
        matches: { increment: 1 },
      },
    });

    return new UserStats(
      Number(updated.userId),
      Number(updated.score),
      Number(updated.wins),
      Number(updated.matches),
    );
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
