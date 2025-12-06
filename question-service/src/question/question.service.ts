import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { GenerateQuestionDto } from './dto/generate-question.dto';
import { Question as QuestionInterface } from './interfaces/question.interface';

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
  private readonly maxRetries = 3;

  async generateQuestions(
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
      let jsonText: string | null = null;
      let attempt = 0;

      while (attempt < this.maxRetries && !jsonText) {
        attempt += 1;
        this.logger.log(
          `Enviando prompt para o OpenRouter (tentativa ${attempt}/${this.maxRetries}):\n${prompt}`,
        );

        const content = await this.callOpenRouter(prompt, apiKey);
        this.logger.debug(' Resposta bruta do modelo:\n' + content);
        jsonText = this.extractJsonArray(content);

        if (!jsonText) {
          this.logger.warn(
            `!!! OpenRouter não retornou JSON válido (tentativa ${attempt}/${this.maxRetries}).`,
          );
        }
      }

      if (!jsonText) {
        this.logger.error(
          '❌ Não foi possível obter JSON válido do OpenRouter após múltiplas tentativas.',
        );
        return { questions: [] };
      }

      const parsed = JSON.parse(jsonText) as ParsedQuestion[];
      const questions: QuestionInterface[] = parsed.map((item) => ({
        statement: item.question,
        alternatives: item.options,
        correctAnswer: item.correctAnswer,
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

  private async callOpenRouter(prompt: string, apiKey: string): Promise<string> {
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
          Authorization: `Bearer ${apiKey}`,
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

    return content;
  }


  private extractJsonArray(text: string): string | null {
    if (!text) return null;

    const cleaned = this.stripModelArtifacts(text);
    if (!cleaned) return null;

    const directParse = this.tryParseJson(cleaned);
    if (directParse) return directParse;

    const start = cleaned.indexOf('[');
    const end = cleaned.lastIndexOf(']');
    if (start === -1 || end === -1 || end <= start) return null;

    const jsonText = cleaned.slice(start, end + 1);
    return this.tryParseJson(jsonText);
  }

  private stripModelArtifacts(text: string): string {
    return text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .replace(/\[\/?B_INST\]/gi, '')
      .replace(/\[\/?B_INS\]/gi, '')
      .replace(/\[\/?INST\]/gi, '')
      .replace(/\[\/?BOT\]/gi, '')
      .replace(/\[\/?ASSISTANT\]/gi, '')
      .replace(/\[\/?ASSIST\]/gi, '')
      .replace(/\[\/?s\]/gi, '')
      .replace(/<\/?s>/gi, '')
      .replace(/<\/?BOS>/gi, '')
      .replace(/<\/?EOS>/gi, '')
      .replace(/\[\/?SYSTEM\]/gi, '')
      .replace(/\[\/?USER\]/gi, '')
      .trim();
  }

  private tryParseJson(payload: string): string | null {
    try {
      const parsed = JSON.parse(payload);
      if (Array.isArray(parsed)) {
        return JSON.stringify(parsed);
      }
      if (parsed && typeof parsed === 'object') {
        return JSON.stringify([parsed]);
      }
      return null;
    } catch {
      return null;
    }
  }
}
