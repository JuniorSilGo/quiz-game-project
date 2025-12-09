import {Module} from '@nestjs/common';
import {AuthModule} from './auth.module';
import {UserModule} from './user.module';
import {PrismaModule} from './prisma.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        PrismaModule,
    ],
})
export class AppModule {
}
