import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RoomService } from './room.service';
import { RoomController } from '../../modules/room/room.controller';

@Module({
  providers: [PrismaService, RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
