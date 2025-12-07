import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { GenerateQuestionDto } from '../dto/generate-question.dto';
import { Question as QuestionInterface } from '../../domain/interfaces/question.interface';
import { QuestionGenerationGateway } from '../../domain/gateways/question-generation.gateway';

@Injectable()
export class GenerateQuestionsUseCase {
  private readonly logger = new Logger(GenerateQuestionsUseCase.name);
  private readonly model =
    process.env.OPENROUTER_MODEL ?? 'mistralai/mistral-7b-instruct';
  private readonly maxRetries = 3;

  constructor(
    private readonly questionGenerationGateway: QuestionGenerationGateway,
  ) {}

  async execute(
    data: GenerateQuestionDto,
  ): Promise<{ questions: QuestionInterface[] }> {
    const { topic, difficulty, quantity = 1 } = data;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      this.logger.error(
        '❌ OPENROUTER_API_KEY não configurada. Defina a variável de ambiente antes de gerar perguntas.',
      );
      return { questions: [] };
    }

    const prompt = `
Gere ${quantity} perguntas de múltipla escolha sobre "${topic}".
Nível de dificuldade: "${difficulty}".
Cada pergunta deve ter 4 alternativas (A, B, C, D), uma resposta correta e o campo "difficulty" com o valor "${difficulty}".
Responda SOMENTE com JSON válido, sem explicações ou texto fora do JSON.
Formato esperado:
[
  {
    "question": "texto da pergunta",
    "options": {"A": "A", "B": "B", "C": "C", "D": "D"},
    "correctAnswer": "A",
    "difficulty": "${difficulty}"
  }
]
`.trim();

    try {
      let generatedQuestions: QuestionInterface[] | null = null;
      let lastRawResponse = '';
      let attempt = 0;

      while (attempt < this.maxRetries && !generatedQuestions) {
        attempt += 1;
        this.logger.log(
          `Enviando prompt para o OpenRouter (tentativa ${attempt}/${this.maxRetries}):\n${prompt}`,
        );

        const { raw, questions } =
          await this.questionGenerationGateway.generateQuestions({
          prompt,
          apiKey,
          model: this.model,
        });

        this.logger.debug(' Resposta bruta do modelo:\n' + raw);
        lastRawResponse = raw;
        generatedQuestions = questions;

        if (!generatedQuestions) {
          this.logger.warn(
            `!!! OpenRouter não retornou JSON válido (tentativa ${attempt}/${this.maxRetries}).`,
          );
        }
      }

      if (!generatedQuestions) {
        this.logger.error(
          '❌ Não foi possível obter JSON válido do OpenRouter após múltiplas tentativas.',
        );
        this.logger.debug('Última resposta recebida (inválida): ' + lastRawResponse);
        return { questions: [] };
      }

      return { questions: generatedQuestions };
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(
          `❌ Erro na requisição ao OpenRouter: ${error.message} - ${error.response?.data}`,
        );
      } else {
        this.logger.error('❌ Erro inesperado ao gerar perguntas:', error);
      }
      return { questions: [] };
    }
  }
}   