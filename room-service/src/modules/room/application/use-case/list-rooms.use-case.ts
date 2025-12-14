import { Inject, Injectable } from '@nestjs/common';
import type { RoomRepository } from '../../domain/repositories/room.repository.interface';
import { RoomEntity } from '../../domain/entities/room.entity';

@Injectable()
export class ListRoomsUseCase {
  constructor(
    @Inject('RoomRepository')
    private readonly roomRepository: RoomRepository,
  ) {}

  async execute(): Promise<RoomEntity[]> {
    return this.roomRepository.findAvailable();
  }
}
