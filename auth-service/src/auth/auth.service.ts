import {ConflictException, Injectable, UnauthorizedException,} from '@nestjs/common';
import {PrismaClient, User} from '@prisma/client';
import * as argon2 from 'argon2';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaClient,
        private jwt: JwtService,
    ) {
    }

    async register(username: string, email: string, password: string) {
        const exists = await this.prisma.user.findFirst({
            where: {OR: [{username}, {email}]},
        });
        if (exists) throw new ConflictException('Username or email already exists');
        const hash = await argon2.hash(password);
        const user = await this.prisma.user.create({
            data: {username, email, passwordHash: hash},
        });
        return this.issue(user);
    }

    async login(usernameOrEmail: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{username: usernameOrEmail}, {email: usernameOrEmail}],
            },
        });
        if (!user || !(await argon2.verify(user.passwordHash, password)))
            throw new UnauthorizedException('Invalid credentials');
        return this.issue(user);
    }

    validateToken(token: string) {
        try {
            const payload = this.jwt.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            return {valid: true, ...payload};
        } catch (e) {
            return {valid: false, reason: 'invalid_or_expired'};
        }
    }

    private issue(user: User) {
        const payload = {
            sub: String(user.id),
            username: user.username,
            email: user.email,
        };
        const accessToken = this.jwt.sign(payload);
        return {
            accessToken,
            tokenType: 'Bearer',
            expiresIn: this.jwt.decode(accessToken)?.exp ?? null,
            user: {id: user.id, username: user.username, email: user.email},
        };
    }
}
