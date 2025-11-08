import {Body, Controller, Post} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';

@Controller('auth')
export class AuthController {
    constructor(private readonly http: HttpService) {
    }

    @Post('login')
    async login(@Body() body: any) {
        const {data} = await this.http.axiosRef.post(
            process.env.AUTH_HTTP_BASE + '/login',
            body,
        );
        return data;
    }

    @Post('register')
    async register(@Body() body: any) {
        const {data} = await this.http.axiosRef.post(
            process.env.AUTH_HTTP_BASE + '/register',
            body,
        );
        return data;
    }
}
