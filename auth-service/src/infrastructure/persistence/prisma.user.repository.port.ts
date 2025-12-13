import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { User } from '@prisma/client';
import type { UserRepositoryPort } from '../../domain/repositories/user.repository.port';

@Injectable()
export class PrismaUserRepositoryPort implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {
  }

  async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { OR: [{ username }, { email }] } });
  }

  async findByLogin(usernameOrEmail: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }] },
    });
  }

  async create(username: string, email: string, password: string): Promise<User> {
    return this.prisma.user.create({ data: { username, email, password } });
  }

  async getById(userId: number): Promise<User> {
    console.log(userId)
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }
}
