import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {AuthGrpcController} from '../controllers/auth/auth.grpc.controller';
import {UserModule} from './user.module';
import {ValidateTokenUseCase} from '../../application/use-cases/auth/validate-token.use-case';
import {IssueTokenUseCase} from '../../application/use-cases/auth/issue-token.use-case';
import {RegisterUserUseCase} from '../../application/use-cases/user/register-user.use-case';
import {LoginUseCase} from '../../application/use-cases/user/login.use-case';
import {NestJwtService} from '../services/nest-jwt.service';
import {JWT_SERVICE_PORT} from 'src/application/ports/jwt-service.port';

const expiresInSec = Number(process.env.JWT_EXPIRES_IN ?? 900);

const jwtServiceProvider = {
    provide: JWT_SERVICE_PORT,
    useClass: NestJwtService,
};

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
              expiresIn: expiresInSec,
              algorithm: "HS256"
            },
        }),
        UserModule,
    ],
    providers: [
        jwtServiceProvider,
        ValidateTokenUseCase,
        IssueTokenUseCase,
        RegisterUserUseCase,
        LoginUseCase,
    ],
    controllers: [AuthGrpcController],
})
export class AuthModule {
}
