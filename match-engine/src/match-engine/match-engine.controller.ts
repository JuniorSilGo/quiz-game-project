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
    const { roomId, ...dto } = payload;
    const res = await this.service.submitAnswer(roomId, dto);
    return res;
  }

  @GrpcMethod('MatchEngineService', 'GetState')
  async getState(payload: { roomId: number }) {
    const state = await this.service.getState(payload.roomId);
    return { state };
  }
}
