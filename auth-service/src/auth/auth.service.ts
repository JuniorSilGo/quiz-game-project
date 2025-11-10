import {ConflictException, Injectable, UnauthorizedException,} from '@nestjs/common';
import * as argon2 from 'argon2';
import {JwtService} from '@nestjs/jwt';
import {User} from '@prisma/client';
import {UserRepository} from '../users/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly repository: UserRepository,
        private readonly jwt: JwtService,
    ) {
    }

    async register(username: string, email: string, password: string): Promise<User> {
        const exists = await this.repository.findByUsernameOrEmail(username, email);
        if (exists) throw new ConflictException('Username or email already exists');

        const hash = await argon2.hash(password);
        return this.repository.create(username, email, hash);
    }

    async login(usernameOrEmail: string, password: string): Promise<User> {
        const user = await this.repository.findByLogin(usernameOrEmail);
        if (!user || !(await argon2.verify(user.password, password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

    issueToken(user: User) {
        const payload = {
            sub: String(user.id),
            username: user.username,
            email: user.email,
        };
        const token = this.jwt.sign(payload);
        return {token, payload};
    }

    validateToken(token: string) {
        try {
            const payload = this.jwt.verify(token, {secret: process.env.JWT_SECRET});
            return {valid: true, ...payload};
        } catch {
            return {valid: false, reason: 'invalid_or_expired'};
        }
    }
}

