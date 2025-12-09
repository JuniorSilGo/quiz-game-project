import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { StatisticsRepository } from '../repositories/statistics.repository';
import { UserStatsResponseDto } from '../../application/dto/user-stats.dto';
import { RankingResponseDto } from '../../application/dto/ranking.dto';
import { DefaultStatsStrategy, StatsStrategy } from './stats-calculator.service';

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
  private readonly strategy: StatsStrategy = new DefaultStatsStrategy();
  private authService: AuthUserService;

  constructor(
    private readonly repository: StatisticsRepository,
    @Inject('AUTH_SERVICE') private readonly client?: ClientGrpc,
  ) {}

  onModuleInit() {
    if (this.client) {
      this.authService = this.client.getService<AuthUserService>('UserService');
    }
  }

  private mapRecordToDto(record: any): UserStatsResponseDto {
    if (!record) {
      return new UserStatsResponseDto({
        userId: 0,
        score: 0,
        wins: 0,
        matches: 0,
      });
    }

    return new UserStatsResponseDto({
      userId: record.userId,
      score: Number(record.score),
      wins: Number(record.wins),
      matches: Number(record.matches),
    });
  }

  async getUserStats(userId: number): Promise<UserStatsResponseDto> {
    this.logger.debug(`Buscando estatísticas do usuário ${userId}`);
    if (this.authService) {
      try {
        const user: AuthUser = await firstValueFrom(
          this.authService.GetUser({ userId }),
        );
        this.logger.debug(`Usuário encontrado no AuthService: ${user.username}`);
      } catch {
        this.logger.warn(`Usuário ${userId} não encontrado no AuthService`);
      }
    }

    const record = await this.repository.findByUserId(userId);

    return record
      ? this.mapRecordToDto(record)
      : new UserStatsResponseDto({
          userId,
          score: 0,
          wins: 0,
          matches: 0,
        });
  }

  async getRanking(): Promise<RankingResponseDto> {
    this.logger.debug('Buscando ranking geral');

    const rows = await this.repository.findAllOrderedByScore();
    const users = rows.map((r) => this.mapRecordToDto(r));

    return new RankingResponseDto(users);
  }

  async updateStatsAfterMatch(
    userId: number,
    deltaScore: number,
    win: boolean,
  ) {
    this.logger.debug(
      `Atualizando stats do user ${userId}: deltaScore=${deltaScore}, win=${win}`,
    );

    const current = await this.repository.findByUserId(userId);

    const baseScore = current ? Number(current.score) : 0;
    const baseWins = current ? Number(current.wins) : 0;
    const baseMatches = current ? Number(current.matches) : 0;

    const newScore = this.strategy.calculateScore(baseScore, deltaScore);
    const newWins = baseWins + (win ? 1 : 0);
    const newMatches = baseMatches + 1;

    return this.repository.upsertUserStats(userId, {
      score: newScore,
      wins: newWins,
      matches: newMatches,
    });
  }
}
