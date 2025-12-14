import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  // 🟦 Cria aplicação HTTP
  const app = await NestFactory.create(AppModule, { cors: true });

  // 🟥 Conecta o microserviço gRPC na porta 50052
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'room',
      protoPath: join(process.cwd(), 'proto/room.proto'),
      url: process.env.ROOM_GRPC_URL ?? '0.0.0.0:50052',
      loader: { keepCase: true },
    },
  });

  await app.startAllMicroservices();
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`HTTP rodando em http://localhost:${port}`);
  console.log(`gRPC rodando em ${process.env.ROOM_GRPC_URL ?? '0.0.0.0:50052'}`);
}
void bootstrap();
