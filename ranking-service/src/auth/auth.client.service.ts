// src/auth/auth.client.service.ts
import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';

interface ValidateTokenResponse {
  valid: boolean;
  userId?: string;
  username?: string;
  email?: string;
  reason?: string;
}

interface AuthGrpcService {
  ValidateToken(payload: { token: string }): Observable<ValidateTokenResponse>;
}

@Injectable()
export class AuthClientService implements OnModuleInit {
  private authService!: AuthGrpcService;


  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit(): void {

    this.authService = this.client.getService<AuthGrpcService>('AuthService');
  }

  async validateToken(token: string): Promise<ValidateTokenResponse> {
    if (!token) {
      throw new UnauthorizedException('Token ausente');
    }


    const result = await lastValueFrom(
      this.authService.ValidateToken({ token }),
    );

    if (!result || !result.valid) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    return result;
  }
}
