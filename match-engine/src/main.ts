import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'match_engine',
      protoPath: join(__dirname, 'grpc/match_engine.proto'),
      url: 'localhost:50053',
    },
  });

  await app.listen();
  console.log('Match-engine gRPC rodando em localhost:50053');
}

bootstrap();

