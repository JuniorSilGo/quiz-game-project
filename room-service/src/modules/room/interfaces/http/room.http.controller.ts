import { Controller, Get, Query, Inject } from '@nestjs/common';
import * as roomRepositoryInterface from '../../domain/repositories/room.repository.interface';

@Controller('debug/room')
export class RoomHttpController {
  constructor(
    @Inject('RoomRepository')
    private readonly roomRepo: roomRepositoryInterface.RoomRepository,
  ) {}

  @Get('find')
  async find(@Query('name') name: string) {
    const room = await this.roomRepo.findByName(name);
    return room ?? { message: 'Sala não encontrada' };
  }
}

// esse http é apenas para testar o findbyname.
