import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AuthHttpController} from './auth.http.controller';
import {AuthGrpcController} from './auth.grpc.controller';
import {UserModule} from "../users/user.module";

const expiresInSec = Number(process.env.JWT_EXPIRES_IN ?? 900);

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: expiresInSec},
        }),
        UserModule
    ],
    providers: [AuthService],
    controllers: [AuthHttpController, AuthGrpcController],
})
export class AuthModule {
}
