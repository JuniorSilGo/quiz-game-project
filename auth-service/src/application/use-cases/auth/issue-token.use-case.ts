import {Inject, Injectable} from "@nestjs/common";
import type {IssueTokenInputDTO, IssueTokenOutputDTO, TokenPayloadDTO} from "../../dto/auth.dto";
import {JWT_SERVICE_PORT, type JwtServicePort} from "src/application/ports/jwt-service.port";

@Injectable()
export class IssueTokenUseCase {
  constructor(
    @Inject(JWT_SERVICE_PORT)
    private readonly jwt: JwtServicePort
  ) {
  }

  execute(user: IssueTokenInputDTO): IssueTokenOutputDTO {
    const payload: TokenPayloadDTO = {
      sub: String(user.id),
      username: user.username,
      email: user.email,
      iss: process.env.JWT_ISSUER ?? 'auth-service',
    };
    const token = this.jwt.sign(payload);
    return {token, payload};
  }
}
