import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PrismaService } from './modules/room/infrastructure/db/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: process.env.ROOM_GRPC_URL ?? '0.0.0.0:50054',
      package: 'room',
      protoPath: join(process.cwd(), 'proto/room.proto'),
    },
  });

  await app.startAllMicroservices();

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  console.log(
    `Room-service running: gRPC at ${process.env.ROOM_GRPC_URL ?? '0.0.0.0:50054'}`,
  );
}

void bootstrap();
