import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {join} from "path";
import {HttpModule} from "@nestjs/axios";
import {AuthGrpcClient} from "./auth.grpc.client";
import {AxiosExceptionFilter} from "../common/filters/axios-exception.filter";
import {APP_FILTER} from "@nestjs/core";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'auth',
                    protoPath: join(process.cwd(), 'proto/auth.proto'),
                    url: `${process.env.AUTH_GRPC_HOST}:${process.env.AUTH_GRPC_PORT}`,
                },
            },
        ]),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthGrpcClient,
        {
            provide: APP_FILTER,          // ← token mágico do NestJS
            useClass: AxiosExceptionFilter,
        },
    ]
})
export class AuthModule {
}
