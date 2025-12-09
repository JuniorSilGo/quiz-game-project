import { Inject, Injectable } from "@nestjs/common";
import type { ValidateTokenInputDTO, ValidateTokenOutputDTO } from "../../dto/auth.dto";
import { JWT_SERVICE_PORT, type JwtServicePort } from "src/application/ports/jwt-service.port";

@Injectable()
export class ValidateTokenUseCase {
  constructor(
    @Inject(JWT_SERVICE_PORT)
    private readonly jwt: JwtServicePort,
  ) {
  }

  execute({ token }: ValidateTokenInputDTO): ValidateTokenOutputDTO {
    try {
      const payload = this.jwt.verify(token);
      return { valid: true, ...payload, sub: payload.sub };
    } catch {
      return { valid: false, reason: 'invalid_or_expired' };
    }
  }

}
