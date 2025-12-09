import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { TokenPayloadDTO } from "src/application/dto/auth.dto";
import { JWT_SERVICE_PORT, type JwtServicePort } from "src/application/ports/jwt-service.port";

@Injectable()
export class NestJwtService implements JwtServicePort {
  constructor(private readonly jwt: JwtService) {
  }

  sign(payload: TokenPayloadDTO): string {
    return this.jwt.sign(payload);
  }

  verify(token: string): TokenPayloadDTO {
    return this.jwt.verify(token, { secret: process.env.JWT_SECRET });
  }
}
