import { Inject, Injectable } from "@nestjs/common";
import { GetUserInputDTO, UserOutputDTO } from "src/application/dto/user.dto";
import { USER_REPOSITORY_PORT, type UserRepositoryPort } from "src/domain/repositories/user.repository.port";
import {toUserOutputDTO} from "../../mappers/user.mapper";

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly users: UserRepositoryPort
  ) {
  }

  async execute(input: GetUserInputDTO): Promise<UserOutputDTO> {
      const user = await this.users.getById(input.userId);
      return toUserOutputDTO(user);
  }
}
