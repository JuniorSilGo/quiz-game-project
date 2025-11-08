import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'player',
      protoPath: join(process.cwd(), 'src/grpc/player.proto'),
      url: 'localhost:50051',
    },
  });

  await app.listen();
  console.log('PlayerService gRPC rodando em localhost:50051');
}

bootstrap();
