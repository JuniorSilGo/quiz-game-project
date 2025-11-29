import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { GenerateQuestionDto } from './dto/generate-question.dto';
import { Question as QuestionInterface } from './interfaces/question.interface';
import { Difficulty } from '@prisma/client';
import prisma from '../db';

interface OpenAIChoice {
  message?: { content?: string };
  text?: string;
}

interface OpenAIResponse {
  choices?: OpenAIChoice[];
}

interface ParsedQuestion {
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  difficulty?: string;
}

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);

  private readonly openRouterUrl =
    'https://openrouter.ai/api/v1/chat/completions';

  private readonly model =
    process.env.OPENROUTER_MODEL ?? 'mistralai/mistral-7b-instruct';

  async generateQuestions(
    data: GenerateQuestionDto,
  ): Promise<{ questions: QuestionInterface[] }> {
    const { topic, difficulty, quantity = 1 } = data;

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
      this.logger.log(`Enviando prompt para o OpenRouter:\n${prompt}`);

      const resp: AxiosResponse<OpenAIResponse> = await axios.post(
        this.openRouterUrl,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'Você é um gerador de perguntas para um jogo de quiz.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.8,
          max_tokens: 1200,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'Quiz Question Service',
            'Content-Type': 'application/json',
          },
        },
      );

      const content: string =
        resp.data?.choices?.[0]?.message?.content ??
        resp.data?.choices?.[0]?.text ??
        '';

      this.logger.debug(' Resposta bruta do modelo:\n' + content);

      const jsonText = this.extractJsonArray(content);
      if (!jsonText) {
        this.logger.warn('!!! OpenRouter não retornou JSON válido.');
        this.logger.debug('Resposta recebida (inválida): ' + content);
        return { questions: [] };
      }

      const parsed = JSON.parse(jsonText) as ParsedQuestion[];

      const savedQuestionsPrisma = await Promise.all(
        parsed.map(async (item) =>
          prisma.question.create({
            data: {
              category: topic ?? 'Geral',
              difficulty: this.mapDifficulty(item.difficulty ?? difficulty),
              questionText: item.question || 'Pergunta não gerada',
              options: item.options ?? { A: '', B: '', C: '', D: '' },
              correctAnswer: item.correctAnswer || 'A',
              source: 'OpenRouter',
            },
          }),
        ),
      );

      const questions: QuestionInterface[] = savedQuestionsPrisma.map((q) => ({
        statement: q.questionText,
        alternatives: q.options as { [key: string]: string },
        correctAnswer: q.correctAnswer,
      }));

      return { questions };
    } catch (err) {
      const error = err as AxiosError;
      this.logger.error(
        '❌ Erro ao gerar perguntas via OpenRouter:',
        error.response?.data || error.message,
      );
      return { questions: [] };
    }
  }

  private mapDifficulty(value: string): Difficulty {
    switch (value.toLowerCase()) {
      case 'easy':
        return Difficulty.EASY;
      case 'medium':
        return Difficulty.MEDIUM;
      case 'hard':
        return Difficulty.HARD;
      default:
        return Difficulty.MEDIUM;
    }
  }

  private extractJsonArray(text: string): string | null {
    if (!text) return null;

    const cleaned = text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const start = cleaned.indexOf('[');
    const end = cleaned.lastIndexOf(']');
    if (start === -1 || end === -1 || end <= start) return null;

    const jsonText = cleaned.slice(start, end + 1);

    try {
      JSON.parse(jsonText);
      return jsonText;
    } catch {
      return null;
    }
  }
}
