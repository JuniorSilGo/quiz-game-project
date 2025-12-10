import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import {
  GeneratedQuestion,
  GenerateQuestionsInput,
  GenerateQuestionsOutput,
  QuestionsPort,
} from '../../domain/repositories/questions.port';

interface QuestionService {
  GenerateQuestions(data: {
    topic: string;
    difficulty: string;
    quantity: number;
  }): Promise<{ questions: GeneratedQuestion[] }>;
}

@Injectable()
export class QuestionsGrpcAdapter implements QuestionsPort, OnModuleInit {
  private questionService!: QuestionService;

  constructor(
    @Inject('QUESTION_GRPC_CLIENT') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.questionService =
      this.client.getService<QuestionService>('QuestionService');
  }

  async generateQuestions(
    input: GenerateQuestionsInput,
  ): Promise<GenerateQuestionsOutput> {
    const res = await this.questionService.GenerateQuestions(input);

    // Garantir que res.questions é um array
    const rawQuestions = Array.isArray(res.questions) ? res.questions : [];

    return {
      questions: rawQuestions.map(
        (q) =>
          new GeneratedQuestion({
            statement: q.statement,
            alternatives: q.alternatives,
            correctAnswer: q.correctAnswer,
          }),
      ),
    };
  }
}
