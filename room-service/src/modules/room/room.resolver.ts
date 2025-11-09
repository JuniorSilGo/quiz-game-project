import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { CreateRoomInput } from './dto/create-room.input';
import { RoomModel } from './models/room.model';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface MatchEngineGrpc {
  createMatch(data: { roomId: string }): Observable<{ matchId: string; status: string }>;
}

@Resolver(() => RoomModel)
export class RoomResolver implements OnModuleInit {
  private matchEngine: MatchEngineGrpc;

  constructor(
    private readonly roomService: RoomService,
    @Inject('MATCH_ENGINE_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.matchEngine = this.client.getService<MatchEngineGrpc>('MatchEngineService');
  }

  @Query(() => [RoomModel])
  listRooms() {
    return this.roomService.listRooms();
  }

  @Mutation(() => RoomModel)
  createRoom(@Args('data') data: CreateRoomInput) {
    return this.roomService.createRoom(data);
  }

  @Mutation(() => RoomModel)
  joinRoom(
    @Args('roomId') roomId: string,
    @Args('playerId') playerId: string,
    @Args('playerName') playerName: string,
  ) {
    return this.roomService.joinRoom({ roomId, playerId, playerName });
  }

  @Mutation(() => RoomModel)
  leaveRoom(
    @Args('roomId') roomId: string,
    @Args('playerId') playerId: string,
  ) {
    return this.roomService.leaveRoom({ roomId, playerId });
  }

  @Mutation(() => String)
  async startMatch(@Args('roomId') roomId: string) {
    await this.roomService.updateStatus(roomId, 'in-progress');

    const result = await this.matchEngine.createMatch({ roomId }).toPromise();

    return `Match started: id=${result.matchId} status=${result.status}`;
  }
}
