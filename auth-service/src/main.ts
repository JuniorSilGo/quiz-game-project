import { NestFactory } from "@nestjs/core";
import { AppModule } from "./infrastructure/nest-modules/app.module";
import { grpcServerOptions } from "./config/grpc.config";

async function bootstrap() {
  // Cria aplicação HTTP
  const app = await NestFactory.create(AppModule, { cors: true });

  // Conecta o microserviço gRPC
  app.connectMicroservice(grpcServerOptions);

  await app.startAllMicroservices();
  
  const httpPort = process.env.HTTP_PORT ?? 3001;
  await app.listen(httpPort);

  console.log(`✅ Auth Service HTTP rodando na porta ${httpPort}`);
  console.log(`✅ Auth Service gRPC rodando na porta ${process.env.GRPC_PORT ?? 50051}`);
}

bootstrap();
