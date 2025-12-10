import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateRoomUseCase } from '../../application/use-case/create-room.use-case';
import { StartMatchUseCase } from '../../application/use-case/start-match.use-case';
import { JoinRoomUseCase } from '../../application/use-case/join-room.use-case';
import { RoomPresenter } from '../../infrastructure/presenters/room.presenter';
import { CreateRoomDto } from '../../application/dto/create-room.dto';
import { StartMatchDto } from '../../application/dto/start-match.dto';
import { JoinRoomDto } from '../../application/dto/join-room.dto';

@Controller()
export class RoomGrpcController {
  constructor(
    @Inject(CreateRoomUseCase) private readonly createRoom: CreateRoomUseCase,
    @Inject(StartMatchUseCase) private readonly startMatch: StartMatchUseCase,
    @Inject(JoinRoomUseCase) private readonly joinRoom: JoinRoomUseCase,
  ) {}

  @GrpcMethod('RoomService', 'CreateRoom')
  async create(payload: CreateRoomDto) {
    const result = await this.createRoom.execute(payload);
    return RoomPresenter.present(result);
  }

  @GrpcMethod('RoomService', 'StartMatch')
  async start(payload: StartMatchDto) {
    return await this.startMatch.execute(payload);
  }

  @GrpcMethod('RoomService', 'JoinRoom')
  async join(payload: JoinRoomDto) {
    return await this.joinRoom.execute(payload);
  }
}
