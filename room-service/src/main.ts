import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, 'room.proto'),
      package: 'room',
      url: '0.0.0.0:50051'
    },
  });

  await app.listen();
  console.log('🚀 Room Service (gRPC) rodando na porta 50051');
}
bootstrap();
