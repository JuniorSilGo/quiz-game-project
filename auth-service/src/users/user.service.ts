import {Injectable} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {User} from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly users: UserRepository) {
    }

    async incrementWins(userId: number) {
        const user = await this.users.incrementWins(userId);
        return this.summarizeCounters(user);
    }

    async incrementMatches(userId: number) {
        const user = await this.users.incrementMatches(userId);
        return this.summarizeCounters(user);
    }

    async recordMatch(userId: number, didWin: boolean) {
        return didWin ? this.incrementWins(userId) : this.incrementMatches(userId);
    }

    async getById(userId: number) {
        const user = await this.users.getById(userId);
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            wins: user.wins,
            matchesPlayed: user.matchesPlayed,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt
        };
    }

    private summarizeCounters(user: User) {
        return {
            success: true,
            userId: user.id,
            username: user.username,
            wins: user.wins,
            matchesPlayed: user.matchesPlayed,
            updatedAt: user.updatedAt,
        };
    }
}
