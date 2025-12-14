import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { QuestionsPort } from '../../domain/repositories/questions.port';
import { QuestionsGrpcService } from '../../application/interfaces/questions-grpc-service.interface';
import type { ClientGrpc } from '@nestjs/microservices';
import { GenerateQuestionsInput } from '../../application/dto/generate-questions.input';
import { GenerateQuestionsOutput } from '../../application/dto/generate-questions.output';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class QuestionsGrpcAdapter implements QuestionsPort, OnModuleInit {
  private questionsService: QuestionsGrpcService;

  constructor(
    @Inject('QUESTION_GRPC_CLIENT') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.questionsService =
      this.client.getService<QuestionsGrpcService>('QuestionService');
  }

  async generateQuestions(
    input: GenerateQuestionsInput,
  ): Promise<GenerateQuestionsOutput> {
    console.log('➡️ Enviando para QuestionService:', input);

    try {
      // CHAMADA REAL DO GRPC (observable)
      const observable = this.questionsService.GenerateQuestions({
        topic: input.topic,
        difficulty: input.difficulty,
        quantity: input.quantity,
      });

      // TRANSFORMA em Promise (agora você tem o RETORNO REAL)
      const result = await lastValueFrom(observable);

      console.log('⬅️ RETORNO REAL DO QUESTION SERVICE:', result);

      // Verifica se result é null ou undefined
      if (!result) {
        console.warn('⚠️ QuestionService retornou null/undefined');
        return { questions: [] };
      }

      // Verifica se result.questions existe e é um array
      if (!Array.isArray(result.questions)) {
        console.warn('⚠️ QuestionService retornou resultado sem array de perguntas:', result);
        return { questions: [] };
      }

      // RETORNA PARA O DOMÍNIO NUM FORMATO PREVISÍVEL
      return {
        questions: result.questions.map((q) => ({
          statement: q.statement,
          alternatives: q.alternatives,
          correctAnswer: q.correctAnswer,
        })),
      };
    } catch (error) {
      console.error('❌ Erro ao chamar QuestionService:', error instanceof Error ? error.message : error);
      return { questions: [] };
    }
  }
}
