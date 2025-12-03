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
        protoPath: join(__dirname, 'proto/ranking.proto'),
        url: process.env.RANKING_GRPC_URL || '0.0.0.0:50052',
      },
    },
  );

  await app.listen();
  console.log(
    '✅ Ranking gRPC service running on',
    process.env.RANKING_GRPC_URL || '0.0.0.0:50052',
  );
}
bootstrap();
