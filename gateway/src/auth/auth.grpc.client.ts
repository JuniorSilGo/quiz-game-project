import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import * as microservices from '@nestjs/microservices';

interface AuthGrpc {
    ValidateToken(data: { token: string }): Promise<any>;
}

@Injectable()
export class AuthGrpcClient implements OnModuleInit {
    private svc: AuthGrpc;

    constructor(@Inject('AUTH_PACKAGE') private client: microservices.ClientGrpc) {
    }

    onModuleInit() {
        this.svc = this.client.getService<AuthGrpc>('AuthService');
    }

    validateToken(token: string) {
        return this.svc.ValidateToken({token});
    }
}
