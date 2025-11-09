import {Module} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {UserHttpController} from "./user.http.controller";
import {UserGrpcController} from "./user.grpc.controller";


@Module({
    providers: [UserRepository, UserService],
    controllers: [UserHttpController, UserGrpcController],
    exports: [UserRepository]
})
export class UserModule {
}
