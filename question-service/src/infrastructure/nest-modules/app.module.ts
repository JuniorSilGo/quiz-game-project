import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionController } from '../grpc/controllers/question.controller';
import { GenerateQuestionsUseCase } from '../../application/use-cases/generate-questions.use-case';
import { OpenRouterClient } from '../../infrastructure/clients/openrouter.client';
import { QuestionGenerationGateway } from '../../domain/gateways/question-generation.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [QuestionController],
  providers: [
    GenerateQuestionsUseCase,
    OpenRouterClient,
    {
      provide: QuestionGenerationGateway,
      useExisting: OpenRouterClient,
    },
  ],
})
export class AppModule {}
