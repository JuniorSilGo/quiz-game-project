// import { Inject, Injectable } from '@nestjs/common';
// // import * as roomRepositoryInterface from '../../domain/repositories/room.repository.interface';
// // import { RoomStatus } from '../../domain/entities/room.entity';

// // export interface StartMatchInput {
// //   roomName: string;
// //   userId: number;
// //   topic: string;
// //   difficulty: string;
// // }

// // export interface StartMatchOutput {
// //   currentRound: number;
// //   userPlayersId: number[];
// //   topic: string;
// //   difficulty: string;
// // }

// @Injectable()
// export class StartMatchUseCase {
//   constructor(
//     @Inject('RoomRepository')
//     private readonly roomRepo: roomRepositoryInterface.RoomRepository,
//   ) {}

//   async execute(input: StartMatchInput): Promise<StartMatchOutput> {
//     // 1 — Buscar sala
//     const room = await this.roomRepo.findByName(input.roomName);
//     if (!room) {
//       throw new Error('Room not found');
//     }

//     // 2 — Validar que user está na sala
//     if (!room.players.includes(input.userId)) {
//       throw new Error('User does not belong to this room');
//     }

//     // 3 — Validar consistência com config da sala
//     if (room.topic !== input.topic || room.difficulty !== input.difficulty) {
//       throw new Error('Room configuration does not match');
//     }

//     // 4 — Atualizar status para STARTED
//     room.status = RoomStatus.STARTED;
//     room.currentRound = 1;

//     // 5 — Persistir
//     await this.roomRepo.updateRoom(room.id!, {
//       status: RoomStatus.STARTED,
//       currentRound: 1,
//     });

//     // 6 — Retornar estado inicial
//     return {
//       currentRound: room.currentRound,
//       userPlayersId: room.players,
//       topic: room.topic,
//       difficulty: room.difficulty,
//     };
//   }
// }
