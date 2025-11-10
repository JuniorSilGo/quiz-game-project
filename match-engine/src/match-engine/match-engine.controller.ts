import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MatchService } from './match-engine.service';

@Controller()
export class MatchController {
  private readonly logger = new Logger(MatchController.name);

  constructor(private readonly service: MatchService) {}

  @GrpcMethod('MatchEngineService', 'StartMatch')
  async startMatch(data: { roomId: number; totalRounds?: number; timeLimitSec?: number; createdBy?: number }) {
    this.logger.log(`gRPC StartMatch called for room ${data.roomId}`);
    const match = await this.service.startMatch(data.roomId, {
      totalRounds: data.totalRounds,
      timeLimitSec: data.timeLimitSec,
      createdBy: data.createdBy,
    } as any);
    return { matchId: match.id, status: match.status };
  }

  @GrpcMethod('MatchEngineService', 'SubmitAnswer')
  async submitAnswer(payload: any) {
    this.logger.log(`gRPC SubmitAnswer called: ${JSON.stringify(payload)}`);
    const { roomId, ...dto } = payload;

    if (!dto.roundId) {
      this.logger.error('SubmitAnswer chamado sem roundId');
      return { success: false, message: 'roundId é obrigatório', score: 0 };
    }
    if (!dto.playerId) {
      this.logger.error('SubmitAnswer chamado sem playerId');
      return { success: false, message: 'playerId é obrigatório', score: 0 };
    }

    const res = await this.service.submitAnswer(roomId, dto);
    return res;
  }

  @GrpcMethod('MatchEngineService', 'GetState')
  async getState(payload: { matchId: number }) {
    const state = await this.service.getState(payload.matchId);
    return state;
  }

  @GrpcMethod('MatchEngineService', 'CreateMatch')
  createMatch(data: { roomId: string; players: string[] }) {
    return this.service.createMatch(data);
  }

  @GrpcMethod('MatchService', 'CreateMatch')
    createMatch(data: { roomId: string; players: string[] }) {
    return this.service.createMatch(data);
  }
}
