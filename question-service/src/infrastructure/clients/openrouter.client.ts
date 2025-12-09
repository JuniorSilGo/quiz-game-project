import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import {
  GenerateQuestionsGatewayParams,
  GenerateQuestionsGatewayResult,
  QuestionGenerationGateway,
} from '../../domain/gateways/question-generation.gateway';
import { Question as QuestionInterface } from '../../domain/interfaces/question.interface';

interface OpenAIChoice {
  message?: { content?: string };
  text?: string;
}

interface OpenAIResponse {
  choices?: OpenAIChoice[];
}

interface ParsedQuestion {
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
  difficulty?: string;
}

@Injectable()
export class OpenRouterClient implements QuestionGenerationGateway {
  private readonly openRouterUrl =
    'https://openrouter.ai/api/v1/chat/completions';

  async generateQuestions({
    prompt,
    apiKey,
    model,
  }: GenerateQuestionsGatewayParams): Promise<GenerateQuestionsGatewayResult> {
    const resp: AxiosResponse<OpenAIResponse> = await axios.post(
      this.openRouterUrl,
      {
        model,
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

    const formatted = this.extractJsonArray(content);
    if (!formatted) {
      return { raw: content, questions: null };
    }

    const questions = this.toDomainQuestions(formatted);
    return {
      raw: content,
      questions,
    };
  }

  private toDomainQuestions(jsonText: string): QuestionInterface[] | null {
    try {
      const parsed = JSON.parse(jsonText) as ParsedQuestion[];
      return parsed.map((item) => ({
        statement: item.question,
        alternatives: item.options ?? {},
        correctAnswer: item.correctAnswer,
      }));
    } catch {
      return null;
    }
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
