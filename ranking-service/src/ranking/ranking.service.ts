import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { lastValueFrom, Observable } from 'rxjs';

interface ValidateTokenRequest {
  token: string;
}

interface ValidateTokenResponse {
  valid: boolean;
  userId?: string;
  username?: string;
  email?: string;
  reason?: string;
}

interface AuthServiceGrpc {
  ValidateToken(
    data: ValidateTokenRequest,
  ): Observable<ValidateTokenResponse>;
}

@Injectable()
export class RankingService implements OnModuleInit {
  private authService: AuthServiceGrpc;

  constructor(
    @Inject('AUTH_PACKAGE') private readonly client: ClientGrpc,
    private readonly prisma: PrismaService,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceGrpc>('AuthService');
  }

  async updateScore({
    token,
    points,
  }: {
    token: string;
    points: number;
  }) {
    let res: ValidateTokenResponse;

    try {
      res = await lastValueFrom(
        this.authService.ValidateToken({ token }),
      );
    } catch {
      // Tipagem segura do catch
      throw new UnauthorizedException(
        'Erro de comunicação com o auth-service',
      );
    }

    if (!res.valid || !res.userId) {
      throw new UnauthorizedException(
        `Token inválido (${res.reason ?? 'unknown'})`,
      );
    }

    const playerId = parseInt(res.userId, 10);
    const username = res.username ?? 'Desconhecido';

    const updated = await this.prisma.ranking.upsert({
      where: { playerId },
      update: {
        score: { increment: points },
        username,
      },
      create: {
        playerId,
        username,
        level: 1,
        score: points,
        position: 0,
      },
    });

    const allRankings = await this.prisma.ranking.findMany({
      orderBy: { score: 'desc' },
    });

    const position = allRankings.findIndex((r) => r.playerId === playerId) + 1;

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

    return {
      playerId,
      username,
      score: updated.score,
      position,
    };
  }

  async getRank(playerId: number) {
    const player = await this.prisma.ranking.findUnique({
      where: { playerId },
    });

    if (!player) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return {
      position: player.position ?? 0,
      score: player.score,
    };
  }

  async getGlobalRanking(limit: number) {
    const rankings = await this.prisma.ranking.findMany({
      orderBy: { score: 'desc' },
      take: limit,
    });

    return {
      rankings: rankings.map((r) => ({
        playerId: r.playerId,
        username: r.username,
        score: r.score,
        position: r.position ?? 0,
      })),
    };
  }

  async getPlayerHistory(playerId: number) {
    const history = await this.prisma.matchHistory.findMany({
      where: { playerId },
      orderBy: { createdAt: 'desc' },
    });

    return {
      history: history.map((h) => ({
        result: h.result,
        pointsDelta: h.pointsDelta,
        createdAt: h.createdAt.toISOString(),
      })),
    };
  }
}
