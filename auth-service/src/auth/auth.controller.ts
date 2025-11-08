import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller()
export class AuthController {
    constructor(private auth: AuthService) {
    }

    @Post('register') register(@Body() b: any) {
        return this.auth.register(b.username, b.email, b.password);
    }

    @Post('login') login(@Body() b: any) {
        return this.auth.login(b.usernameOrEmail, b.password);
    }
}
