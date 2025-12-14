import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginUseCase } from 'src/application/use-cases/user/login.use-case';
import { RegisterUserUseCase } from 'src/application/use-cases/user/register-user.use-case';
import { IssueTokenUseCase } from 'src/application/use-cases/auth/issue-token.use-case';
import type { LoginInputDTO, RegisterUserInputDTO } from 'src/application/dto/auth.dto';
import type { UserOutputDTO } from 'src/application/dto/user.dto';

@Controller('auth')
export class AuthHttpController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly issueTokenUseCase: IssueTokenUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginInputDTO) {
    const user = await this.loginUseCase.login(payload);
    return this.buildAuthResponse(user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() payload: RegisterUserInputDTO) {
    const user = await this.registerUserUseCase.execute(payload);
    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: UserOutputDTO) {
    const { token } = this.issueTokenUseCase.execute({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    };
  }
}
