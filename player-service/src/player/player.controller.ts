import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PlayerService } from './player.service';

@Controller()
export class PlayerGrpcController {
  constructor(private readonly playerService: PlayerService) {}

  @GrpcMethod('PlayerService', 'GetPlayerById')
  async getPlayerById(data: { id: number }) {
    const player = await this.playerService.findOne(data.id);
    return { player };
  }

  @GrpcMethod('PlayerService', 'GetPlayerByUsername')
  async getPlayerByUsername(data: { username: string }) {
    const player = await this.playerService.findByUsername(data.username);
    return { player };
  }

  @GrpcMethod('PlayerService', 'CreatePlayer')
  async createPlayer(data: any) {
    const player = await this.playerService.create(data);
    return { player };
  }

  @GrpcMethod('PlayerService', 'UpdatePlayer')
  async updatePlayer(data: any) {
    const player = await this.playerService.update(data.id, data);
    return { player };
  }

  @GrpcMethod('PlayerService', 'DeletePlayer')
  async deletePlayer(data: { id: number }) {
    const success = await this.playerService.remove(data.id);
    return { success };
  }
}
