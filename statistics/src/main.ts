import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport, GrpcOptions } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Statistics-Main');

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  app.enableCors();

  const grpcServerOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'statistics',
      protoPath: join(__dirname.includes('dist') ? process.cwd() + '/src' : process.cwd(),'infrastructure/grpc/proto/statistics.proto'),
      url: '0.0.0.0:50050', 
    },
  };

  app.connectMicroservice(grpcServerOptions);

  await app.startAllMicroservices();
  logger.log(`gRPC Statistics Service is running at: ${grpcServerOptions.options.url}`);

  await app.listen(3000);
  logger.log('HTTP Statistics server running on port 3000');
}

bootstrap().catch((err) => {
  console.error('Erro ao iniciar microserviço Statistics:', err);
  process.exit(1);
});
