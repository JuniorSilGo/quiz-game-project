import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IStatisticsRepository } from './statistics.repository.interface';

@Injectable()
export class StatisticsRepository implements IStatisticsRepository {
  private prisma = new PrismaClient();

  async findByUserId(userId: number) {
    return this.prisma.userStats.findUnique({ where: { userId } });
  }

  async findAllOrderedByScore(limit?: number) {
    return this.prisma.userStats.findMany({
      orderBy: { score: 'desc' },
      take: limit ?? undefined,
    });
  }

  async upsertUserStats(userId: number, data: any) {
    const createData = {
      userId,
      score: BigInt(data.score ?? 0),
      wins: BigInt(data.wins ?? 0),
      matches: BigInt(data.matches ?? 0),
    };

    const updateData: any = {};
    if (data.score !== undefined) updateData.score = BigInt(data.score);
    if (data.wins !== undefined) updateData.wins = BigInt(data.wins);
    if (data.matches !== undefined) updateData.matches = BigInt(data.matches);

    return this.prisma.userStats.upsert({
      where: { userId },
      create: createData,
      update: updateData,
    });
  }

  async incrementStats(userId: number, scoreToAdd: number, won: boolean) {
    const existing = await this.prisma.userStats.findUnique({
      where: { userId },
    });

    if (!existing) {
      return this.prisma.userStats.create({
        data: {
          userId,
          score: BigInt(scoreToAdd),
          wins: BigInt(won ? 1 : 0),
          matches: BigInt(1),
        },
      });
    }

    return this.prisma.userStats.update({
      where: { userId },
      data: {
        score: { increment: scoreToAdd },
        wins: won ? { increment: 1 } : undefined,
        matches: { increment: 1 },
      },
    });
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}

