import {ConflictException, Inject, Injectable} from "@nestjs/common";
import * as argon2 from 'argon2';
import { USER_REPOSITORY_PORT } from "src/domain/repositories/user.repository.port";
import type {UserRepositoryPort} from "src/domain/repositories/user.repository.port";
import type {RegisterUserInputDTO} from "../../dto/auth.dto";
import type {UserOutputDTO} from "../../dto/user.dto";
import {toUserOutputDTO} from "../../mappers/user.mapper";

@Injectable()
export class RegisterUserUseCase {
    constructor(
      @Inject(USER_REPOSITORY_PORT)
      private readonly repository: UserRepositoryPort
    ) {
    }
  
    async execute(input: RegisterUserInputDTO): Promise<UserOutputDTO> {
        const {username, email, password} = input;
        const exists = await this.repository.findByUsernameOrEmail(username, email);
        if (exists) throw new ConflictException('Usuário ou e-mail já existe');

        const hash = await argon2.hash(password);
        const user = await this.repository.create(username, email, hash);
        return toUserOutputDTO(user);
    }
}
