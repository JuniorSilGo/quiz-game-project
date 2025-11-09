import {Controller} from '@nestjs/common';
import {GrpcMethod} from '@nestjs/microservices';
import {AuthService} from './auth.service';

@Controller()
export class AuthGrpcController {
    constructor(private readonly auth: AuthService) {
    }

    @GrpcMethod('AuthService', 'ValidateToken')
    validateToken({token}: { token: string }) {
        const res = this.auth.validateToken(token);
        if (res.valid) {
            return {
                valid: true,
                userId: res.sub,
                username: res.username,
                email: res.email,
            };
        }
        return {valid: false, reason: res.reason ?? 'invalid'};
    }

}
