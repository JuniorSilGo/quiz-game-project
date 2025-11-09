import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'ranking',
        protoPath: join(__dirname, '../src/proto/ranking.proto'),
        url: '0.0.0.0:50052',
      },
    },
  );

  await app.listen();
  console.log('==== Ranking gRPC Service rodando na porta 50052 ====');
}

bootstrap();
