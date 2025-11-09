import { Injectable } from '@nestjs/common';
import { MatchEngineRepository } from './match-engine.repository';
import { CreateMatchEngineDto, SubmitAnswerDto, GetStateDto } from './dto/create-match-engine.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MatchEngineService {
  constructor(private readonly repo: MatchEngineRepository) { }

  async startMatch(dto: CreateMatchEngineDto) {
    const match = await this.repo.createMatch({
      roomId: dto.roomId,
      totalRounds: dto.totalRounds || 3,
      timeLimitSec: dto.timeLimitSec || 30,
      status: 'RUNNING',
      currentRound: 1,
      mode: (dto as any).mode ?? 'SOLO',
    } as Prisma.MatchCreateInput);
    return match;
  }

  async submitAnswer(dto: SubmitAnswerDto) {
    return { success: true };
  }

  async getState(dto: GetStateDto) {
    return this.repo.getSnapshot(dto.roomId);
  }

  createMatch(data: { roomId: string; players: string[] }) {
    console.log("[MATCH ENGINE] creating match", data);
    return {
      matchId: "match-" + Date.now(),
      status: "CREATED",
    };
  }
}
