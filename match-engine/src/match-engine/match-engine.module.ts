import { Module, Global } from '@nestjs/common';
import { MatchController } from './match-engine.controller';
import { MatchService } from './match-engine.service';
import { MatchRepository } from './match-engine.repository';
import { MatchGateway } from '../gateways/match-engine.gateways';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as path from 'path';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ROOM_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'room',
          protoPath: path.join(__dirname, '../protos/room.proto'),
          url: process.env.ROOM_SERVICE_URL || 'localhost:50051',
        },
      },
      {
        name: 'QUESTION_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'question',
          protoPath: path.join(__dirname, '../protos/question.proto'),
          url: process.env.QUESTION_SERVICE_URL || 'localhost:50052',
        },
      },
      {
        name: 'RANKING_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'ranking',
          protoPath: path.join(__dirname, '../protos/ranking.proto'),
          url: process.env.RANKING_SERVICE_URL || 'localhost:50053',
        },
      },
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService, MatchRepository, MatchGateway],
  exports: [MatchService, MatchRepository],
})
export class MatchEngineModule {}
