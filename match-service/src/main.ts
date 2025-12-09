import {NestFactory} from '@nestjs/core';
import {AppModule} from './infrastructure/nest-modules/app.module';
import {grpcServerOptions} from './config/grpc.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, grpcServerOptions);
  await app.listen();
}

bootstrap();
