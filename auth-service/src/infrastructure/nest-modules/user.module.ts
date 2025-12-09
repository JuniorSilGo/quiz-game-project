import {Module} from '@nestjs/common';
import {UserGrpcController} from "../grpc/controllers/user/user.grpc.controller";
import {USER_REPOSITORY_PORT} from 'src/domain/repositories/user.repository.port';
import {PrismaUserRepositoryPort} from '../persistence/prisma.user.repository.port';
import {GetUserUseCase} from '../../application/use-cases/user/get-user.use-case';
import {RegisterUserUseCase} from "../../application/use-cases/user/register-user.use-case";

const userRepoProvider = {
    provide: USER_REPOSITORY_PORT,
    useClass: PrismaUserRepositoryPort,
};


@Module({
    providers: [
        userRepoProvider,
        PrismaUserRepositoryPort,
        GetUserUseCase,
        RegisterUserUseCase,
    ],
    controllers: [UserGrpcController],
    exports: [userRepoProvider, PrismaUserRepositoryPort],
})
export class UserModule {
}
