import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { UserRepositoryPort } from "src/domain/repositories/user.repository.port";
import {USER_REPOSITORY_PORT} from "src/domain/repositories/user.repository.port";
import * as argon2 from 'argon2';
import type {LoginInputDTO} from "../../dto/auth.dto";
import type {UserOutputDTO} from "../../dto/user.dto";
import {toUserOutputDTO} from "../../mappers/user.mapper";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly repository: UserRepositoryPort
  ) {
  }

  async login(input: LoginInputDTO): Promise<UserOutputDTO> {
    const {usernameOrEmail, password} = input;
    const user = await this.repository.findByLogin(usernameOrEmail);
    if (!user || !(await argon2.verify(user.password, password))) {
        throw new UnauthorizedException('Credenciais inválidas');
    }
    return toUserOutputDTO(user);
  }
  
}
