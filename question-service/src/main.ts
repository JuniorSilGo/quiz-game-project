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
        package: 'question',
        protoPath: join(process.cwd(), 'src', 'proto', 'question.proto'),
        url: '0.0.0.0:50054',
      },
    },
  );

  await app.listen();
  console.log('==== Question gRPC Service rodando na porta 50051 ====');
}

bootstrap();
