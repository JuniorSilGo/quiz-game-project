import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  GenerateQuestionsGatewayParams,
  GenerateQuestionsGatewayResult,
  QuestionGenerationGateway,
} from '../../domain/gateways/question-generation.gateway';
import { BASE_QUESTION_GENERATION_GATEWAY } from '../../domain/gateways/gateway.tokens';

@Injectable()
export class RetryingQuestionGenerationGateway
  implements QuestionGenerationGateway
{
  private readonly logger = new Logger(RetryingQuestionGenerationGateway.name);
  private readonly maxAttempts = 3;

  constructor(
    @Inject(BASE_QUESTION_GENERATION_GATEWAY)
    private readonly baseGateway: QuestionGenerationGateway,
  ) {}

  async generateQuestions(
    params: GenerateQuestionsGatewayParams,
  ): Promise<GenerateQuestionsGatewayResult> {
    let attempt = 0;
    let lastResult: GenerateQuestionsGatewayResult = { raw: '', questions: null };

    while (attempt < this.maxAttempts) {
      attempt += 1;
      this.logger.log(
        `⏳ Gerando perguntas tentativa ${attempt}/${this.maxAttempts}.`,
      );

      lastResult = await this.baseGateway.generateQuestions(params);

      if (lastResult.questions) {
        this.logger.log('✅ Perguntas geradas com sucesso.');
        return lastResult;
      }

      this.logger.warn(
        `⚠️ Tentativa ${attempt} não retornou JSON válido; repetindo...`,
      );
    }

    this.logger.error(
      '❌ Máximo de tentativas atingido sem JSON válido do OpenRouter.',
    );

    if (lastResult.raw) {
      this.logger.debug('Última resposta bruta recebida:\n' + lastResult.raw);
    }

    return lastResult;
  }
}
