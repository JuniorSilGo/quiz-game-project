import { RoomFactory } from '../../domain/services/room.factory';
import type { RoomRepository } from '../../domain/repositories/room.repository.interface';
import { CreateRoomInput } from '../dto/create-room.input';
import { RoomEntity } from '../../domain/entities/room.entity';
import { Inject } from '@nestjs/common';
import type { QuestionsPort } from '../../domain/repositories/questions.port';
import type { MatchPort } from '../../domain/repositories/match.port';

export class CreateRoomUseCase {
  constructor(
    @Inject('RoomRepository')
    private readonly roomRepository: RoomRepository,

    @Inject('QuestionsPort')
    private readonly questions: QuestionsPort,

    @Inject('MatchPort')
    private readonly match: MatchPort,
  ) {}

  // fluxo:
  // 1. Criar a sala / salvar no banco
  // 2. Requisição das perguntas via question-service
  // 3. Requisição para criar uma partida via match-service
  // 4. Atualizar status da sala

  async execute(input: CreateRoomInput): Promise<RoomEntity> {
    // Verificar se já existe uma sala com esse nome
    const existingRoom = await this.roomRepository.findByName(input.name);

    if (existingRoom) {
      // Se o usuário já está na sala, retorna ela (reconectar)
      if (existingRoom.players.includes(input.createdById)) {
        console.log(
          `Usuário ${input.createdById} reconectando à sala ${input.name}`,
        );
        return existingRoom;
      }
      // Se é outro usuário, erro
      throw new Error(
        `Sala "${input.name}" já existe. Escolha outro nome ou entre na sala existente.`,
      );
    }

    // 1. Criar a sala
    console.log('>>> 1. Criando sala...');
    const room = RoomFactory.create({
      name: input.name,
      topic: input.topic,
      difficulty: input.difficulty,
      rounds: input.rounds,
      createdById: input.createdById,
      players: input.players,
      maxPlayers: input.maxPlayers,
    });

    const createdRoom = await this.roomRepository.create(room);
    console.log(`>>> Sala criada: ${createdRoom.name} (ID: ${createdRoom.id})`);

    // 2. Gerar perguntas via question-service
    console.log('>>> 2. Gerando perguntas via question-service...');
    const questionsResult = await this.questions.generateQuestions({
      topic: room.topic,
      difficulty: room.difficulty,
      quantity: room.rounds,
    });
    const generatedQuestions = questionsResult.questions || [];
    console.log(`>>> Perguntas geradas: ${generatedQuestions.length}`);

    // Se nenhuma pergunta foi gerada, continua mesmo assim
    if (generatedQuestions.length === 0) {
      console.warn(
        '⚠️ Nenhuma pergunta foi gerada. A sala será criada sem perguntas.',
      );
    }

    // 3. Criar o match via match-service
    console.log('>>> 3. Criando match via match-service...');
    const matchResult = await this.match.createMatch({
      roomName: createdRoom.name,
      userId: room.createdById,
      questions: generatedQuestions,
      userPlayersIds: room.players,
      topic: room.topic,
      difficulty: room.difficulty,
    });
    console.log(
      `>>> Match criado: ${matchResult.roomName}, rounds: ${matchResult.totalRounds}`,
    );

    // 4. Atualizar a sala com o matchId (se necessário)
    // await this.roomRepository.attachMatch(createdRoom.id, matchResult.matchId);

    return createdRoom;
  }
}
