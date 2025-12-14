import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  // Cria apenas o microserviço gRPC (sem HTTP)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'room',
      protoPath: join(process.cwd(), 'proto/room.proto'),
      url: process.env.ROOM_GRPC_URL ?? '0.0.0.0:50052',
      loader: { keepCase: true },
    },
  });

  await app.listen();

  console.log(`gRPC rodando em ${process.env.ROOM_GRPC_URL ?? '0.0.0.0:50052'}`);
}
void bootstrap();
