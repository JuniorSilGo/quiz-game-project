import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './modules/game/game.module';
import { PrismaService } from 'database/prisma.service';

@Module({
    imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
