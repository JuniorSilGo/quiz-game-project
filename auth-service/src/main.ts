import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {join} from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.HTTP_PORT || 3001);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: 'auth',
            protoPath: join(process.cwd(), 'proto/auth.proto'),
            url: `0.0.0.0:${process.env.GRPC_PORT || 50056}`,
        },
    });
    await app.startAllMicroservices();
}

bootstrap();
