import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {GrpcAuthController} from './grpc.controller';
import {PrismaClient} from '@prisma/client';

const expiresInSec = Number(process.env.JWT_EXPIRES_IN ?? 900);

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: expiresInSec},
        }),
    ],
    providers: [AuthService, PrismaClient],
    controllers: [AuthController, GrpcAuthController],
})
export class AuthModule {
}
