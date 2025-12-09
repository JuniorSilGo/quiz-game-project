import { toUserGrpcResponse } from "./user.mapper";
import type { UserOutputDTO } from "../dto/user.dto";

export const toAuthGrpcResponse = (user: UserOutputDTO, token: string) => ({
  accessToken: token,
  tokenType: 'Bearer',
  user: toUserGrpcResponse(user),
});
