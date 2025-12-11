import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import * as microservices from '@nestjs/microservices';
import {
  MatchPort,
  CreateMatchInput,
  CreateMatchOutput,
} from '../../domain/repositories/match.port';

interface MatchServiceGrpc {
  CreateMatchRequest(data: {
    userId: number;
    questions: {
      statement: string;
      alternatives: Record<string, string>;
      correctAnswer: string;
    }[];
    userPlayersIds: number[];
    difficulty: string;
    topic: string;
  }): Promise<{
    currentRound: number;
    totalRounds: number;
    userPlayersIds: number[];
    difficulty: string;
    topic: string;
  }>;
}

@Injectable()
export class MatchGrpcAdapter implements MatchPort, OnModuleInit {
  private matchService!: MatchServiceGrpc;

  constructor(
    @Inject('MATCH_GRPC_CLIENT')
    private readonly client: microservices.ClientGrpc,
  ) {}

  onModuleInit() {
    this.matchService =
      this.client.getService<MatchServiceGrpc>('MatchService');
  }

  async createMatch(input: CreateMatchInput): Promise<CreateMatchOutput> {
    const response = await this.matchService.CreateMatchRequest({
      userId: input.userId,
      questions: input.questions.map((q) => ({
        statement: q.statement,
        alternatives: q.alternatives,
        correctAnswer: q.correctAnswer,
      })),
      userPlayersIds: input.userPlayersIds,
      difficulty: input.difficulty,
      topic: input.topic,
    });

    return {
      currentRound: response.currentRound,
      totalRounds: response.totalRounds,
      userPlayersIds: response.userPlayersIds,
      difficulty: response.difficulty,
      topic: response.topic,
    };
  }
}
