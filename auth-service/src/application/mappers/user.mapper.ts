import type { UserOutputDTO } from "../dto/user.dto";
import type { User } from "../../domain/entities/user.entity";

export const toUserOutputDTO = (user: User): UserOutputDTO => ({
  id: user.id,
  username: user.username,
  email: user.email,
  updatedAt: user.updatedAt,
  createdAt: user.createdAt,
});

export const toUserGrpcResponse = (user: UserOutputDTO) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt?.toISOString?.(),
  updatedAt: user.updatedAt?.toISOString?.(),
});
