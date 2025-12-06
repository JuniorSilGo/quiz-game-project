import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StatisticsRepository implements OnModuleDestroy {
  private prisma = new PrismaClient();

  async findByUserId(userId: number) {
    return this.prisma.userStats.findUnique({
      where: { userId },
    });
  }

  async findAllOrderedByScore(limit?: number) {
    return this.prisma.userStats.findMany({
      orderBy: { score: 'desc' },
      take: limit ?? undefined,
    });
  }

  async upsertUserStats(userId: number, data: Partial<{ score: bigint | number; wins: bigint | number; matches: bigint | number }>) {
    const createData: any = {
      userId,
      score: BigInt(data.score ?? 0),
      wins: BigInt(data.wins ?? 0),
      matches: BigInt(data.matches ?? 0),
    };

    const updateData: any = {};
    if (data.score !== undefined) updateData.score = BigInt(data.score as any);
    if (data.wins !== undefined) updateData.wins = BigInt(data.wins as any);
    if (data.matches !== undefined) updateData.matches = BigInt(data.matches as any);

    return this.prisma.userStats.upsert({
      where: { userId },
      create: createData,
      update: updateData,
    });
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
