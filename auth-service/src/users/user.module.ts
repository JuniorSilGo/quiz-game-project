import {Module} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {UserGrpcController} from "./user.grpc.controller";


@Module({
    providers: [UserRepository, UserService],
    controllers: [UserGrpcController],
    exports: [UserRepository]
})
export class UserModule {
}
