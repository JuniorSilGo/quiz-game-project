import { Module } from '@nestjs/common';

// Repository e infra:
import { RoomPrismaRepository } from './infrastructure/db/room.prisma.repository';
import { PrismaService } from './infrastructure/db/prisma.service';

// Use Cases:
import { JoinRoomUseCase } from './application/use-case/join-room.use-case';
import { CreateRoomUseCase } from './application/use-case/create-room.use-case';

// Controllers:
import { RoomGrpcController } from './interfaces/grpc/room.grpc.controller';
import { RoomHttpController } from './interfaces/http/room.http.controller'; // Excluir depois de finalizar todas as integrações

// Questions:
import { QuestionsGrpcAdapter } from './infrastructure/grpc/questions.grpc.adapter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'QUESTION_GRPC_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: process.env.QUESTION_GRPC_URL ?? 'localhost:50052',
          package: 'question',
          protoPath: join(process.cwd(), 'proto/question.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  // posteriormente excluir o roomhttpcontroller.
  controllers: [RoomGrpcController, RoomHttpController],

  providers: [
    PrismaService,
    {
      provide: 'RoomRepository',
      useClass: RoomPrismaRepository,
    },
    {
      provide: 'QuestionsPort',
      useClass: QuestionsGrpcAdapter,
    },
    CreateRoomUseCase,
    JoinRoomUseCase,
  ],
})
export class RoomModule {}
