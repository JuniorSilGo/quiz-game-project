import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/match' })
export class MatchGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MatchGateway.name);

  emitNewQuestion(roomId: number, payload: any) {
    this.logger.log(`emit newQuestion room=${roomId}`);
    this.server.to(String(roomId)).emit('newQuestion', payload);
  }

  emitScoreUpdate(roomId: number, payload: any) {
    this.server.to(String(roomId)).emit('scoreUpdate', payload);
  }

  emitRoundResult(roomId: number, payload: any) {
    this.server.to(String(roomId)).emit('roundResult', payload);
  }

  emitMatchEnded(roomId: number, payload: any) {
    this.server.to(String(roomId)).emit('matchEnded', payload);
  }
}
