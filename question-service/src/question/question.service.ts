import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { GenerateQuestionDto } from './dto/generate-question.dto';
import { Question } from './interfaces/question.interface';

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

  // 🔹 Endpoint do OpenRouter
  private readonly openRouterUrl =
    'https://openrouter.ai/api/v1/chat/completions';

  // 🔹 Modelo gratuito recomendado (pode trocar no .env)
  private readonly model =
    process.env.OPENROUTER_MODEL ?? 'mistralai/mistral-7b-instruct';

  async generateQuestions(
    data: GenerateQuestionDto,
  ): Promise<{ questions: Question[] }> {
    const { topic, difficulty, quantity = 1 } = data;

    const prompt = `
Gere ${quantity} perguntas de múltipla escolha sobre "${topic}",
no nível de dificuldade "${difficulty}".
Cada pergunta deve ter 4 alternativas (A, B, C e D), uma resposta correta e o campo "difficulty" com o valor "${difficulty}".
Responda **somente** com o JSON (array), sem explicações, sem comentários e sem texto fora do JSON.
Formato esperado:
[
  {
    "question": "texto da pergunta",
    "options": {"A": "A", "B": "B", "C": "C", "D": "D"},
    "correctAnswer": "A",
    "difficulty": "${difficulty}"
  }
]`.trim();

    try {
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

      // 🔹 Novo log: mostra o que o modelo realmente respondeu
      this.logger.debug('🧠 Resposta bruta do modelo:', content);

      const jsonText = this.extractJsonArray(content);
      if (!jsonText) {
        this.logger.warn('⚠️ OpenRouter não retornou JSON válido.');
        this.logger.debug('Resposta recebida:', content);
        return { questions: [] };
      }

      const parsed = JSON.parse(jsonText) as ParsedQuestion[];

      const questions: Question[] = parsed.map((item) => ({
        question: item.question || '',
        options: {
          A: item.options?.A || '',
          B: item.options?.B || '',
          C: item.options?.C || '',
          D: item.options?.D || '',
        },
        correctAnswer: item.correctAnswer || 'A',
        topic,
        difficulty: item.difficulty || difficulty,
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

  // 🔹 Método melhorado para limpar e validar o JSON
  private extractJsonArray(text: string): string | null {
    if (!text) return null;

    // Remove blocos de markdown como ```json ou ```
    const cleaned = text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const start = cleaned.indexOf('[');
    const end = cleaned.lastIndexOf(']');

    if (start === -1 || end === -1 || end <= start) {
      return null;
    }

    const jsonText = cleaned.slice(start, end + 1);

    try {
      JSON.parse(jsonText); // valida o JSON
      return jsonText;
    } catch {
      return null;
    }
  }
}
