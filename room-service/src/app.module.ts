import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './modules/room/room.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './database/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    ClientsModule.register([
      {
        name: 'MATCH_ENGINE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'game',
          protoPath: join(process.cwd(), 'src/game.proto'),
          url: process.env.MATCH_ENGINE_URL || 'localhost:50051',
        },
      },
    ]),
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
