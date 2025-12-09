import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserUseCase } from 'src/application/use-cases/user/get-user.use-case';
import { RegisterUserUseCase } from "src/application/use-cases/user/register-user.use-case";
import type { RegisterUserInputDTO } from "src/application/dto/auth.dto";
import type { GetUserInputDTO } from 'src/application/dto/user.dto';
import { toUserGrpcResponse } from "src/application/mappers/user.mapper";

@Controller()
export class UserGrpcController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {
  }

  @GrpcMethod('UserService', 'GetUser')
  userId(payload: GetUserInputDTO) {
    return this.getUserUseCase.execute(payload).then(toUserGrpcResponse);
  }

  @GrpcMethod('UserService', 'RegisterUser')
  registerUser(payload: RegisterUserInputDTO) {
    return this.registerUserUseCase.execute(payload).then(toUserGrpcResponse);
  }
}
