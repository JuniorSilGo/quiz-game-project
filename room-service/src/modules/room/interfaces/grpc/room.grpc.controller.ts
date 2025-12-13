import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateRoomUseCase } from '../../application/use-case/create-room.use-case';
// import { StartMatchUseCase } from '../../application/use-case/start-match.use-case';
// import { JoinRoomUseCase } from '../../application/use-case/join-room.use-case';
// import { RoomPresenter } from '../../infrastructure/presenters/room.presenter';
// import { CreateRoomDto } from '../../application/dto/create-room.dto';
import type { CreateRoomRequestDto } from './dtos/create-room.request.dto';
import { CreateRoomResponseDto } from './dtos/create-room.response.dto';
import { CreateRoomInput } from '../../application/dto/create-room.input';
import { JoinRoomUseCase } from '../../application/use-case/join-room.use-case';
import type { UserRoomRequestDto } from './dtos/user-room.request.dto';
// import { StartMatchDto } from '../../application/dto/start-match.dto';
// import { JoinRoomDto } from '../../application/dto/join-room.dto';

@Controller()
export class RoomGrpcController {
  constructor(
    private readonly createRoom: CreateRoomUseCase,
    // @Inject(StartMatchUseCase) private readonly startMatch: StartMatchUseCase,
    private readonly joinRoom: JoinRoomUseCase,
  ) {}

  @GrpcMethod('RoomService', 'CreateRoom')
  async create(request: CreateRoomRequestDto): Promise<CreateRoomResponseDto> {
    console.log('conteúdo do request: ', request);

    const input: CreateRoomInput = {
      name: request.roomName,
      topic: request.topic,
      difficulty: request.difficulty,
      rounds: request.rounds,
      createdById: request.userId,
      players: request.userPlayersIds ?? [],
    };

    const room = await this.createRoom.execute(input);

    const response: CreateRoomResponseDto = {
      id: room.id!,
      name: room.name,
      topic: room.topic,
      difficulty: room.difficulty,
      rounds: room.rounds,
      userOwnerId: room.createdById,
      userPlayersId: room.players,
      matchQtd: room.rounds,
      matchId: room.matchId ?? '',
      status: room.status,
    };

    return response;
  }

  @GrpcMethod('RoomService', 'JoinRoom')
  async join(request: UserRoomRequestDto) {
    const input = {
      roomName: request.roomName,
      userId: request.userId,
    };

    const room = await this.joinRoom.execute(input);

    // adicionar um dto de response?
    if (!room) {
      throw new Error('Erro ao entrar na sala.');
    }

    return {
      id: room.id,
      name: room.name,
      topic: room.topic,
      difficulty: room.difficulty,
      rounds: room.rounds,
      userOwnerId: room.createdById,
      userPlayersId: room.players,
      matchQtd: room.rounds,
      matchId: room.matchId ?? '',
      status: room.status,
    };
  }

  // @GrpcMethod('RoomService', 'StartMatch')
  // async start(payload: StartMatchDto) {
  //   return await this.startMatch.execute(payload);
  // }
}
