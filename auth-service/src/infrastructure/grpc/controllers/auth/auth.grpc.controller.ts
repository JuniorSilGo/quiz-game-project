import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RegisterUserUseCase } from 'src/application/use-cases/user/register-user.use-case';
import { LoginUseCase } from 'src/application/use-cases/user/login.use-case';
import { IssueTokenUseCase } from 'src/application/use-cases/auth/issue-token.use-case';
import { ValidateTokenUseCase } from 'src/application/use-cases/auth/validate-token.use-case';
import type { LoginInputDTO, RegisterUserInputDTO } from "src/application/dto/auth.dto";
import type { UserOutputDTO } from "src/application/dto/user.dto";
import { toAuthGrpcResponse } from "src/application/mappers/auth.mapper";

@Controller()
export class AuthGrpcController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly issueTokenUseCase: IssueTokenUseCase,
    private readonly validateTokenUseCase: ValidateTokenUseCase,
  ) {
  }

  @GrpcMethod('AuthService', 'Register')
  async register(payload: RegisterUserInputDTO) {
    const user = await this.registerUserUseCase.execute(payload);
    return this.buildAuthResponse(user);
  }

  @GrpcMethod('AuthService', 'Login')
  async login(payload: LoginInputDTO) {
    const user = await this.loginUseCase.login(payload);
    return this.buildAuthResponse(user);
  }

  @GrpcMethod('AuthService', 'ValidateToken')
  validateToken({ token }: { token: string }) {
    const res = this.validateTokenUseCase.execute({ token });
    if (res.valid) {
      return {
        valid: true,
        userId: res.sub,
        username: res.username,
        email: res.email,
      };
    }
    return { valid: false, reason: res.reason ?? 'invalid' };
  }

  private buildAuthResponse(user: UserOutputDTO) {
    const { token } = this.issueTokenUseCase.execute({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    return toAuthGrpcResponse(user, token);
  }
}
