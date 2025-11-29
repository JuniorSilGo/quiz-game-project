import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthClientService } from './auth.client.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authClient: AuthClientService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      const auth = req.headers['authorization'] || req.headers['Authorization'];
      if (!auth) throw new UnauthorizedException('Token ausente');
      const token = (Array.isArray(auth) ? auth[0] : auth).replace('Bearer ', '');
      const user = await this.authClient.validateToken(token);
      if (!user?.valid) throw new UnauthorizedException('Token inválido ou expirado');
      req.user = user;
      return true;
    }

    const data = context.switchToRpc().getData() as any;
    let token = data?.token;

    if (!token) {
      const metadata = context.getArgByIndex(1);
      if (metadata && typeof metadata.get === 'function') {
        const vals = metadata.get('authorization') || metadata.get('Authorization');
        if (vals?.length) token = (vals[0] as string).replace('Bearer ', '');
      }
    }

    if (!token) throw new UnauthorizedException('Token ausente');
    const user = await this.authClient.validateToken(token);
    if (!user?.valid) throw new UnauthorizedException('Token inválido ou expirado');
    if (data && typeof data === 'object') data.user = user;

    return true;
  }
}
