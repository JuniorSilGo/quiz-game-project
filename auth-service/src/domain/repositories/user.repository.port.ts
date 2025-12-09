import { User } from "../entities/user.entity";

export const USER_REPOSITORY_PORT = 'USER_REPOSITORY_PORT';

export interface UserRepositoryPort {
  findByUsernameOrEmail(username: string, email: string): Promise<User | null>;
  findByLogin(usernameOrEmail: string): Promise<User | null>;
  create(username: string, email: string, password: string): Promise<User>;
  getById(userId: number): Promise<User>;
}
