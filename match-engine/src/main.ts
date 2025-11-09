import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { existsSync } from 'fs';

// Função para detectar o caminho correto do .proto tanto npm run start:dev e npm run start:grpc roda sem erros
function getProtoPath(): string {
  const distPath = join(__dirname, 'proto/match_engine.proto');
  if (existsSync(distPath)) return distPath;

  const tsPath = join(process.cwd(), 'proto/match_engine.proto');
  if (existsSync(tsPath)) return tsPath;

  throw new Error('Arquivo match_engine.proto não encontrado');
}

async function bootstrap() {
  const protoPath = getProtoPath();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'match_engine', 
        protoPath: protoPath,
        url: 'localhost:50051',
      },
    },
  );

  await app.listen();
  console.log('Match-engine gRPC rodando em localhost:50051');
}

bootstrap();
