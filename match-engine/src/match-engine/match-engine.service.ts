import { Injectable, Logger, OnModuleDestroy, Inject } from '@nestjs/common';
import { MatchRepository } from './match-engine.repository';
import { MatchGateway } from '../gateways/match-engine.gateways';
import { CreateMatchDto } from './dto/match/create-match.dto';
import { CreatePlayerAnswerDto } from './dto/player-answer/create-player-answer.dto';

import type { QuestionServiceClient } from '../grpc/interfaces/question.grpc.interface';
import type { RankingServiceClient } from '../grpc/interfaces/ranking.grpc.interfaces';
import type { RoomServiceClient } from '../grpc/interfaces/room.grpc.interface';

@Injectable()
export class MatchService implements OnModuleDestroy {
  private readonly logger = new Logger(MatchService.name);

  constructor(
    private readonly repo: MatchRepository,
    private readonly gateway: MatchGateway,
    @Inject('QUESTION_SERVICE') private readonly questionClient: QuestionServiceClient,
    @Inject('RANKING_SERVICE') private readonly rankingClient: RankingServiceClient,
    @Inject('ROOM_SERVICE') private readonly roomClient: RoomServiceClient,
  ) {}

  async startMatch(roomId: number, dto?: Partial<CreateMatchDto>) {
    const room = await this.roomClient.getRoom({ roomId });

    const match = await this.repo.createMatch({
      roomId,
      mode: dto?.mode ?? 'CLASSIC',
      status: 'RUNNING',
      totalRounds: dto?.totalRounds ?? 10,
      timeLimitSec: dto?.timeLimitSec ?? 30,
      startedAt: new Date(),
      createdBy: dto?.createdBy,
    });

    for (const p of room.players || []) {
      await this.repo.upsertMatchPlayer(match.id, p.id, {
        username: p.username,
      });
    }

    await this.roomClient.notifyMatchStarted({
      roomId,
      matchId: match.id,
    });

    await this.emitNextQuestion(match.id, roomId, 1);

    return match;
  }

  private async emitNextQuestion(matchId: number, roomId: number, roundIndex: number) {
    const question = await this.questionClient.fetchQuestion({ roomId, roundIndex });

    const payload = {
      round: roundIndex,
      questionId: question.questionId,
      text: question.text,
      options: question.options,
      timeLimitSec: 30,
    };

    await this.repo.createRound({
      matchId,
      index: roundIndex,
      questionId: payload.questionId,
      startedAt: new Date(),
      timeLimitSec: payload.timeLimitSec,
    });

    this.gateway.emitNewQuestion(roomId, payload);
  }

  async submitAnswer(roomId: number, dto: CreatePlayerAnswerDto) {
    const answer = await this.repo.createPlayerAnswer({
      roundId: dto.roundId,
      matchPlayerId: dto.matchPlayerId,
      playerId: dto.playerId,
      answerId: dto.answerId,
      isCorrect: dto.isCorrect,
      timeMs: dto.timeMs,
      pointsAwarded: dto.pointsAwarded ?? 0,
    });

    const round = await this.repo.findRoundById(dto.roundId);

    if (!round) {
      this.logger.error(`Round ${dto.roundId} não encontrado ao submeter resposta.`);
      throw new Error(`Round ${dto.roundId} não encontrado`);
    }

    const matchId = round.matchId;

    await this.repo.updateMatchPlayerScore(
      matchId,
      dto.playerId,
      dto.pointsAwarded || 0
    );

    this.gateway.emitScoreUpdate(roomId, {
      playerId: dto.playerId,
      added: dto.pointsAwarded || 0,
    });

    try {
      await this.rankingClient.updateScores({
        playerId: dto.playerId,
        points: dto.pointsAwarded || 0,
      });
    } catch (err) {
      this.logger.error('Ranking update failed: ' + err?.message);
    }

    return { ok: true, answerId: answer.id };
  }

  async getState(roomId: number) {
    const match = await this.repo.findMatchByRoomId(roomId);
    if (!match) return null;

    const players = await this.repo.findMatchPlayers(match.id);

    return {
      matchId: match.id,
      roomId: match.roomId,
      status: match.status,
      currentRound: match.currentRound,
      players: players.map(p => ({
        id: p.playerId,
        username: p.username,
        score: p.score,
      })),
    };
  }

  async endMatch(matchId: number, roomId: number) {
    await this.repo.updateMatch(matchId, {
      status: 'FINISHED',
      endedAt: new Date(),
    });

    this.gateway.emitMatchEnded(roomId, { matchId });
  }

  onModuleDestroy() {
    this.repo.disconnect();
  }
}
