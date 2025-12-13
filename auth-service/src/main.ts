import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { AppModule } from "./infrastructure/nest-modules/app.module";
import { grpcServerOptions } from "./config/grpc.config";

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      grpcServerOptions,
    );

  await app.listen();
}

bootstrap();
