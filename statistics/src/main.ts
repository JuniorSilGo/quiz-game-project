import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'statistics',
      protoPath: join(process.cwd(), 'src/infrastructure/grpc/proto/statistics.proto'),
      url: '0.0.0.0:50050',
    },
  });

  await app.listen();
  console.log('✅ statistics-service gRPC running on 50050');
}
bootstrap();
