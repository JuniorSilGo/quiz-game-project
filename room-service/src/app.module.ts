import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './modules/room/room.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // deixa disponível no projeto inteiro
    }),
    RoomModule,
  ],
})
export class AppModule {}
