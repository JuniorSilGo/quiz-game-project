import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type {
  MatchPort,
  CreateMatchInput,
  CreateMatchOutput,
} from '../../domain/repositories/match.port';

interface MatchServiceGrpc {
  CreateMatch(data: any): any;
}

@Injectable()
export class MatchGrpcAdapter implements MatchPort, OnModuleInit {
  private matchService!: MatchServiceGrpc;

  constructor(
    @Inject('MATCH_GRPC_CLIENT')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.matchService = this.client.getService<MatchServiceGrpc>('MatchService');
  }

  async createMatch(input: CreateMatchInput): Promise<CreateMatchOutput> {
    console.log('MatchGrpcAdapter.createMatch - input:', JSON.stringify(input));

    const request = {
      roomName: input.roomName,
      userId: input.userId,
      questions: input.questions.map((q) => ({
        statement: q.statement,
        alternatives: q.alternatives,
        correctAnswer: q.correctAnswer,
      })),
      userPlayersIds: input.userPlayersIds,
      topic: input.topic,
      difficulty: input.difficulty,
    };

    try {
      const response = await firstValueFrom(this.matchService.CreateMatch(request)) as any;
      console.log('MatchGrpcAdapter.createMatch - response:', response);

      return {
        roomName: response.roomName,
        currentRound: response.currentRound,
        totalRounds: response.totalRounds,
        userPlayersIds: response.userPlayersIds || [],
        topic: response.topic,
        difficulty: response.difficulty,
      };
    } catch (error) {
      console.error('MatchGrpcAdapter.createMatch - error:', error);
      throw error;
    }
  }
}
