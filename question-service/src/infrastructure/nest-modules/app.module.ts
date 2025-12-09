import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionController } from '../grpc/controllers/question.controller';
import { GenerateQuestionsUseCase } from '../../application/use-cases/generate-questions.use-case';
import { OpenRouterClient } from '../../infrastructure/clients/openrouter.client';
import { QuestionGenerationGateway } from '../../domain/gateways/question-generation.gateway';
import { RetryingQuestionGenerationGateway } from '../../infrastructure/gateways/retrying-question-generation.gateway';
import { BASE_QUESTION_GENERATION_GATEWAY } from '../../domain/gateways/gateway.tokens';

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
    RetryingQuestionGenerationGateway,
    {
      provide: BASE_QUESTION_GENERATION_GATEWAY,
      useExisting: OpenRouterClient,
    },
    {
      provide: QuestionGenerationGateway,
      useExisting: RetryingQuestionGenerationGateway,
    },
  ],
})
export class AppModule {}
