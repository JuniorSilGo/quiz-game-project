import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  // Esse aqui é o que vai ficar depois que tudo estiver pronto.

  //   const app = await NestFactory.createMicroservice(AppModule, {
  //     transport: Transport.GRPC,
  //     options: {
  //       package: 'room',
  //       protoPath: join(process.cwd(), 'proto/room.proto'),
  //       url: '0.0.0:50051',
  //       loader: {
  //         keepCase: true,
  //       },
  //     },
  //   });

  //   await app.listen();
  //   console.log(
  //     `Room-service running: gRPC at ${process.env.ROOM_GRPC_URL ?? '0.0.0.0:50051'}`,
  //   );
  // }

  // 🟦 Cria aplicação HTTP
  const app = await NestFactory.create(AppModule, { cors: true });

  // 🟥 Conecta o microserviço gRPC
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'room',
      protoPath: join(process.cwd(), 'proto/room.proto'),
      url: '0.0.0.0:50051',
      loader: { keepCase: true },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log('HTTP rodando em http://localhost:3000');
  console.log('gRPC rodando em 0.0.0.0:50051');
}
void bootstrap();
