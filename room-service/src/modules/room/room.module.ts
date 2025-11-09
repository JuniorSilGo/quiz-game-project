import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RoomService } from './room.service';
import { RoomController } from '../../modules/room/room.controller';
import { RoomResolver } from './room.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MATCH_ENGINE_CLIENT",
        transport: Transport.GRPC,
        options: {
          package: "match_engine", // mesmo nome do .proto
          protoPath: join(__dirname, "../../match_engine.proto"),
          url: "localhost:50051",
        },
      },
    ]),
  ],
  providers: [PrismaService, RoomService, RoomResolver],
  controllers: [RoomController],
})
export class RoomModule {}
