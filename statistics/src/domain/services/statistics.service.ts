import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { StatisticsRepository } from '../repositories/statistics.repository';
import { UserStatsResponseDto, RankingResponseDto } from '../../application/dto/statistics.dto';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface AuthUser {
  id: number;
  username: string;
  email: string;
  wins: number;
  matchesPlayed: number;
  createdAt: string;
  updatedAt: string;
}

interface AuthUserService {
  GetUser(data: { userId: number }): any; 
}

@Injectable()
export class StatisticsService implements OnModuleInit {
  private readonly logger = new Logger(StatisticsService.name);
  private authService: AuthUserService;

  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientGrpc,
    private readonly repository: StatisticsRepository,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthUserService>('UserService');
  }

  private mapPrismaToDto(record: any): UserStatsResponseDto {
    if (!record) {
      return new UserStatsResponseDto({ userId: 0, score: 0, wins: 0, matches: 0 });
    }
    const score = record.score !== null ? Number(record.score.toString()) : 0;
    const wins = record.wins !== null ? Number(record.wins.toString()) : 0;
    const matches = record.matches !== null ? Number(record.matches.toString()) : 0;

    return new UserStatsResponseDto({
      userId: record.userId,
      score,
      wins,
      matches,
    });
  }

  async getUserStats(userId: number): Promise<UserStatsResponseDto> {
    this.logger.debug(`Buscando estatísticas do usuário ${userId}`);

    try {
      const user: AuthUser = await firstValueFrom(this.authService.GetUser({ userId }));
      this.logger.debug(`Usuário encontrado no AuthService: ${user.username}`);
    } catch (err) {
      this.logger.warn(`Usuário ${userId} não encontrado no AuthService`);
    }

    const record = await this.repository.findByUserId(userId);
    return record
      ? this.mapPrismaToDto(record)
      : new UserStatsResponseDto({ userId, score: 0, wins: 0, matches: 0 });
  }

  async getRanking(): Promise<RankingResponseDto> {
    this.logger.debug('Buscando ranking geral');
    const rows = await this.repository.findAllOrderedByScore();
    const users = rows.map((r) => this.mapPrismaToDto(r));
    return new RankingResponseDto(users);
  }

  async updateStatsAfterMatch(userId: number, deltaScore: number, win: boolean) {
    this.logger.debug(`Atualizando stats do user ${userId}: deltaScore=${deltaScore}, win=${win}`);
    const current = await this.repository.findByUserId(userId);

    const newScore = current ? Number(current.score.toString()) + deltaScore : deltaScore;
    const newWins = current ? Number(current.wins.toString()) + (win ? 1 : 0) : win ? 1 : 0;
    const newMatches = current ? Number(current.matches.toString()) + 1 : 1;

    return this.repository.upsertUserStats(userId, {
      score: newScore,
      wins: newWins,
      matches: newMatches,
    });
  }
}
