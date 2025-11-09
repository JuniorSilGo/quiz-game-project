import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RoomService } from './room.service';
import { RoomController } from '../../modules/room/room.controller';
import { RoomResolver } from './room.resolver';

@Module({
  providers: [PrismaService, RoomService, RoomResolver],
  controllers: [RoomController],
})
export class RoomModule {}
