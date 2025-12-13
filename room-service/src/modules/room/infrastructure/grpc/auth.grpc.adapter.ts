// import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import type { ClientGrpc } from '@nestjs/microservices';
// import { AuthPort } from '../../domain/repositories/auth.port';

// interface UserService {
//   GetUser(data: {
//     userId: number;
//   }): Promise<{ id: number; username?: string; email?: string }>;
// }

// @Injectable()
// export class AuthGrpcAdapter implements AuthPort, OnModuleInit {
//   private userService!: UserService;

//   constructor(
//     @Inject('AUTH_GRPC_CLIENT') private readonly client: ClientGrpc,
//   ) {}

//   onModuleInit() {
//     this.userService = this.client.getService<UserService>('UserService');
//   }

//   async getUserById(userId: number) {
//     try {
//       return await this.userService.GetUser({ userId });
//     } catch {
//       return null;
//     }
//   }
// }
