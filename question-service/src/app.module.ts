import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionService } from './question/question.service';
import { QuestionController } from './question/question.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class AppModule {}
