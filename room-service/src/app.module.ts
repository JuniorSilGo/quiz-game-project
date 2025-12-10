import { Module } from '@nestjs/common';
import { RoomGrpcController } from './modules/room/interfaces/grpc/room.grpc.controller';
import { ConfigModule } from '@nestjs/config';

// Prisma
import { PrismaService } from './modules/room/infrastructure/db/prisma.service';
import { RoomPrismaRepository } from './modules/room/infrastructure/db/room.prisma.repository';

// Use cases
import { CreateRoomUseCase } from './modules/room/application/use-case/create-room.use-case';
import { StartMatchUseCase } from './modules/room/application/use-case/start-match.use-case';
import { JoinRoomUseCase } from './modules/room/application/use-case/join-room.use-case';

// Ports (Domain interfaces)
import { RoomRepository } from './modules/room/domain/repositories/room.repository.interface';
import { AuthPort } from './modules/room/domain/repositories/auth.port';
import { QuestionsPort } from './modules/room/domain/repositories/questions.port';
import { MatchPort } from './modules/room/domain/repositories/match.port';

// gRPC Adapters
import { AuthGrpcAdapter } from './modules/room/infrastructure/grpc/auth.grpc.adapter';
import { QuestionsGrpcAdapter } from './modules/room/infrastructure/grpc/questions.grpc.adapter';
import { MatchGrpcAdapter } from './modules/room/infrastructure/grpc/match.grpc.adapter';

// gRPC ClientsModule configuration
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // deixa disponível no projeto inteiro
    }),
    // gRPC clients configuration
    ClientsModule.register([
      {
        name: 'AUTH_GRPC_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: process.env.AUTH_GRPC_URL,
          package: 'auth',
          protoPath: join(process.cwd(), 'proto/auth.proto'),
        },
      },
      {
        name: 'QUESTION_GRPC_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: process.env.QUESTION_GRPC_URL,
          package: 'question',
          protoPath: join(process.cwd(), 'proto/question.proto'),
        },
      },
      {
        name: 'MATCH_GRPC_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: process.env.MATCH_GRPC_URL,
          package: 'match',
          protoPath: join(process.cwd(), 'proto/match.proto'),
        },
      },
    ]),
  ],

  controllers: [RoomGrpcController],

  providers: [
    // Prisma
    PrismaService,

    // Repositórios concretos
    {
      provide: 'RoomRepository',
      useClass: RoomPrismaRepository,
    },

    // Adapters (Ports concretos)
    {
      provide: 'AuthPort',
      useClass: AuthGrpcAdapter,
    },
    {
      provide: 'QuestionsPort',
      useClass: QuestionsGrpcAdapter,
    },
    {
      provide: 'MatchPort',
      useClass: MatchGrpcAdapter,
    },

    // Use-cases — injetando as dependências explicitamente
    {
      provide: CreateRoomUseCase,
      useFactory: (
        roomRepo: RoomRepository,
        auth: AuthPort,
        questions: QuestionsPort,
        match: MatchPort,
      ) => new CreateRoomUseCase(roomRepo, auth, questions, match),
      inject: ['RoomRepository', 'AuthPort', 'QuestionsPort', 'MatchPort'],
    },

    {
      provide: StartMatchUseCase,
      useFactory: (roomRepo: RoomRepository) => new StartMatchUseCase(roomRepo),
      inject: ['RoomRepository', 'QuestionsPort', 'MatchPort'],
    },

    {
      provide: JoinRoomUseCase,
      useFactory: (roomRepo: RoomRepository) => new JoinRoomUseCase(roomRepo),
      inject: ['RoomRepository'],
    },
  ],
})
export class AppModule {}
