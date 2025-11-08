import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';
import {AuthGrpcClient} from '../../auth/auth.grpc.client';

@Injectable()
export class GqlAuthGuard implements CanActivate {
    constructor(private authClient: AuthGrpcClient) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();
        const auth = ctx.req.headers.authorization || '';

        const token = auth.startsWith('Bearer ') ? auth.substring(7) : null;
        if (!token) throw new UnauthorizedException('Missing token');

        const res = await this.authClient.validateToken(token);

        if (!res?.valid) throw new UnauthorizedException('Invalid token');

        ctx.user = {id: res.userId, username: res.username, email: res.email};

        return true;
    }
}
