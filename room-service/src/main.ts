import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, 'room.proto'),
      package: 'room',
<<<<<<< HEAD
      url: '0.0.0.0:50053'
    },
  });

  await app.listen();
  console.log('🚀 Room Service (gRPC) rodando na porta 50053');
=======
      url: '0.0.0.0:50052'
    },
  });

  await app.startAllMicroservices();
  console.log('Room Service (gRPC) rodando na porta 50052'); 

  await app.listen(3000);
  console.log('GraphQL Room Service rodando na porta 3000');
  
>>>>>>> origin/junior-gomes
}
bootstrap();
