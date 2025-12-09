import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { GenerateQuestionDto } from '../dto/generate-question.dto';
import { Question as QuestionInterface } from '../../domain/interfaces/question.interface';
import { QuestionGenerationGateway } from '../../domain/gateways/question-generation.gateway';
import { QuestionPromptBuilder } from '../builders/question-prompt.builder';
import { DifficultyStrategyFactory } from '../../domain/strategies/difficulty/difficulty-strategy.factory';

@Injectable()
export class GenerateQuestionsUseCase {
  private readonly logger = new Logger(GenerateQuestionsUseCase.name);
  private readonly model =
    process.env.OPENROUTER_MODEL ?? 'mistralai/mistral-7b-instruct';
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

    const difficultyStrategy = DifficultyStrategyFactory.create(difficulty);
    const instructions = difficultyStrategy.getInstruction(quantity);

    const prompt = new QuestionPromptBuilder()
      .withTopic(topic)
      .withDifficulty(difficulty)
      .withQuantity(quantity)
      .withAdditionalInstructions(instructions)
      .build();

    try {
      this.logger.log(
        `Enviando prompt para o gerador de perguntas (${difficultyStrategy.name}).`,
      );

      const { raw, questions } =
        await this.questionGenerationGateway.generateQuestions({
          prompt,
          apiKey,
          model: this.model,
        });

      if (!questions) {
        this.logger.error(
          '❌ O OpenRouter não retornou JSON válido mesmo após as tentativas configuradas.',
        );
        this.logger.debug('Última resposta recebida (inválida): ' + raw);
        return { questions: [] };
      }

      this.logger.log('✅ Perguntas geradas com sucesso.');
      return { questions };
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