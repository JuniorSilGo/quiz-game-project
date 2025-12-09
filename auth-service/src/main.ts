import {NestFactory} from '@nestjs/core';
import {AppModule} from './infrastructure/nest-modules/app.module';
import {MicroserviceOptions} from '@nestjs/microservices';
import { grpcServerOptions } from './config/grpc.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.HTTP_PORT || 3001);

    app.connectMicroservice<MicroserviceOptions>(grpcServerOptions);
    await app.startAllMicroservices();
}

bootstrap();
