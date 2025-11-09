import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {User} from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
        return this.prisma.user.findFirst({where: {OR: [{username}, {email}]}});
    }

    async findByLogin(usernameOrEmail: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {OR: [{username: usernameOrEmail}, {email: usernameOrEmail}]},
        });
    }

    async create(username: string, email: string, password: string): Promise<User> {
        return this.prisma.user.create({data: {username, email, password}});
    }

    async incrementWins(userId: number): Promise<User> {
        return this.prisma.user.update({
            where: {id: userId},
            data: {wins: {increment: 1}, matchesPlayed: {increment: 1}},
        });
    }

    async incrementMatches(userId: number): Promise<User> {
        return this.prisma.user.update({
            where: {id: userId},
            data: {matchesPlayed: {increment: 1}},
        });
    }

    async getById(userId: number): Promise<User> {
        const user = await this.prisma.user.findUnique({where: {id: userId}});
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
