import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthClientService } from './auth.client.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',

          protoPath: join(process.cwd(), 'src/proto/auth.proto'),
          url: process.env.AUTH_GRPC_URL || 'localhost:50051',
        },
      },
    ]),
  ],
  providers: [AuthClientService, AuthGuard],
  exports: [AuthClientService, AuthGuard],
})
export class AuthModule {}
