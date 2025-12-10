import { Inject, Injectable } from '@nestjs/common';
import { RoomFactory } from '../../domain/services/room.factory';
import * as roomRepositoryInterface from '../../domain/repositories/room.repository.interface';
import * as questionsPort from '../../domain/repositories/questions.port';
import * as matchPort from '../../domain/repositories/match.port';

export interface CreateRoomInput {
  roomName: string;
  userId: number;
  topic: string;
  difficulty: string;
  rounds: number;
  userPlayersIds?: number[];
}

export interface CreateRoomOutput {
  id: number;
  name: string;
  topic: string;
  difficulty: string;
  rounds: number;
  players: number[];
  matchId: string | null;
}

@Injectable()
export class CreateRoomUseCase {
  constructor(
    @Inject('RoomRepository')
    private readonly roomRepo: roomRepositoryInterface.RoomRepository,

    @Inject('QuestionsPort')
    private readonly questions: questionsPort.QuestionsPort,

    @Inject('MatchPort')
    private readonly match: matchPort.MatchPort,
  ) {}

  async execute(input: CreateRoomInput): Promise<CreateRoomOutput> {
    // 1 — Criar entidade validada pela Factory
    const room = RoomFactory.createRoom({
      name: input.roomName,
      topic: input.topic,
      difficulty: input.difficulty,
      rounds: input.rounds,
      createdById: input.userId,
      players: input.userPlayersIds,
    });

    // 2 — Persistir no banco
    const createdRoom = await this.roomRepo.createRoom(room);

    // 3 — Gerar perguntas via question-service
    const generatedQuestions = await this.questions.generateQuestions({
      topic: room.topic,
      difficulty: room.difficulty,
      quantity: room.rounds,
    });

    // 4 — Criar o match via match-service
    const matchResult = await this.match.createMatch({
      userId: room.createdById,
      questions: generatedQuestions,
      userPlayersIds: room.players,
      topic: room.topic,
      difficulty: room.difficulty,
    });

    // 5 — Se matchId existir, salvar na sala
    if (matchResult.matchId) {
      await this.roomRepo.attachMatch(createdRoom.id, matchResult.matchId);
    }

    // 6 — Retorno final
    return {
      id: createdRoom.id,
      name: room.name,
      topic: room.topic,
      difficulty: room.difficulty,
      rounds: room.rounds,
      players: room.players,
      matchId: matchResult.matchId ?? null,
    };
  }
}
