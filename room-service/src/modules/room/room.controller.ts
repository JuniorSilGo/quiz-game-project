import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RoomService } from './room.service';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @GrpcMethod('RoomService', 'CreateRoom')
  async createRoom(data: { name: string; ownerId: string }) {
    const room = await this.roomService.createRoom(data);
    return { id: room.id, name: room.name, status: room.status };
  }

  @GrpcMethod('RoomService', 'JoinRoom')
  async joinRoom(data: { roomId: string; playerId: string; playerName: string }) {
    return this.roomService.joinRoom(data);
  }

  @GrpcMethod('RoomService', 'GetRooms')
  async getRooms(_: any, __: any) {
    const rooms = await this.roomService.listRooms();
    return { rooms: rooms.map(room => ({ id: room.id, name: room.name, status: room.status })) };
  }

  @GrpcMethod('RoomService', 'ListPlayers')
  async listPlayers(data: { roomId: string }) {
    return this.roomService.listPlayers(data.roomId);
  }

  @GrpcMethod('RoomService', 'NotifyMatchStart')
  async notifyMatchStart(data: { roomId: string }) {
    return this.roomService.notifyMatchStart(data.roomId);
  }

  @GrpcMethod('RoomService', 'Ping')
  ping(_: any) {
    return { message: 'pong' };
  }
}
