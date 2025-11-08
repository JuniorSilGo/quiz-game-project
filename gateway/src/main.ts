import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {join} from "path";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AxiosExceptionFilter} from "./common/filters/axios-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AxiosExceptionFilter());
    await app.listen(process.env.HTTP_PORT || 3000);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: 'auth',
            protoPath: join(process.cwd(), 'proto/auth.proto'),
            url: `0.0.0.0:${process.env.GRPC_PORT || 50050}`,
        },
    });
    await app.startAllMicroservices();
}

bootstrap();
