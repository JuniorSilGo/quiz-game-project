import type { TokenPayloadDTO } from "src/application/dto/auth.dto";

export const JWT_SERVICE_PORT = "JWT_SERVICE_PORT";

export interface JwtServicePort {
  sign(payload: TokenPayloadDTO): string;
  verify(token: string): TokenPayloadDTO;
}
