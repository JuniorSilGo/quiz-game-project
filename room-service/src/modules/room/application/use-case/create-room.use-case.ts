import { RoomFactory } from '../../domain/services/room.factory';
import type { RoomRepository } from '../../domain/repositories/room.repository.interface';
import { CreateRoomInput } from '../dto/create-room.input';
import { RoomEntity } from '../../domain/entities/room.entity';
import { Inject } from '@nestjs/common';
import type { QuestionsPort } from '../../domain/repositories/questions.port';

// import * as questionsPort from '../../domain/repositories/questions.port';
// import * as matchPort from '../../domain/repositories/match.port';

export class CreateRoomUseCase {
  constructor(
    @Inject('RoomRepository')
    private readonly roomRepository: RoomRepository,

    @Inject('QuestionsPort')
    private readonly questions: QuestionsPort,

    // private readonly match: matchPort.MatchPort,
  ) {}

  // fluxo:
  // Criar a sala/ salvar no banco ->
  // Requisição das perguntas/ salvar no banco ->
  // Requisição para criar uma partida passando as informações necessárias ->
  // Atualizar os status da sala

  async execute(input: CreateRoomInput): Promise<RoomEntity> {
    // Verificar se já existe uma sala com esse nome
    const existingRoom = await this.roomRepository.findByName(input.name);
    
    if (existingRoom) {
      // Se o usuário já está na sala, retorna ela (reconectar)
      if (existingRoom.players.includes(input.createdById)) {
        console.log(`Usuário ${input.createdById} reconectando à sala ${input.name}`);
        return existingRoom;
      }
      // Se é outro usuário, erro
      throw new Error(`Sala "${input.name}" já existe. Escolha outro nome ou entre na sala existente.`);
    }

    const room = RoomFactory.create({
      name: input.name,
      topic: input.topic,
      difficulty: input.difficulty,
      rounds: input.rounds,
      createdById: input.createdById,
      players: input.players,
    });

    const createdRoom = await this.roomRepository.create(room);

    // // 3 — Gerar perguntas via question-service
    const generatedQuestions = await this.questions.generateQuestions({
      topic: room.topic,
      difficulty: room.difficulty,
      quantity: room.rounds,
    });

    console.log('QUESTIONS RAW RESPONSE:', generatedQuestions);

    // // 4 — Criar o match via match-service
    // const matchResult = await this.match.createMatch({
    //   userId: room.createdById,
    //   questions: generatedQuestions,
    //   userPlayersIds: room.players,
    //   topic: room.topic,
    //   difficulty: room.difficulty,
    // });

    // // 5 — Se matchId existir, salvar na sala // es
    // if (matchResult.matchId) {
    //   await this.roomRepo.attachMatch(createdRoom.id, matchResult.matchId);
    // }

    // // 6 — Retorno final
    return createdRoom;
  }
}
