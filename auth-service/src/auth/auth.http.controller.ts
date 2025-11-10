import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthHttpController {
    constructor(private readonly auth: AuthService) {
    }

    @Post('register')
    async register(@Body() body: { username: string; email: string; password: string }) {
        const user = await this.auth.register(body.username, body.email, body.password);
        const {token} = this.auth.issueToken(user);
        return {
            accessToken: token,
            tokenType: 'Bearer',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                wins: user.wins,
                matchesPlayed: user.matchesPlayed,
                updatedAt: user.updatedAt,
            },
        };
    }

    @Post('login')
    async login(@Body() body: { usernameOrEmail: string; password: string }) {
        const user = await this.auth.login(body.usernameOrEmail, body.password);
        const {token} = this.auth.issueToken(user);
        return {
            accessToken: token,
            tokenType: 'Bearer',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                wins: user.wins,
                matchesPlayed: user.matchesPlayed,
                updatedAt: user.updatedAt,
            },
        };
    }
}
