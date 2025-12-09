import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import {
  GenerateQuestionsGatewayParams,
  GenerateQuestionsGatewayResult,
  QuestionGenerationGateway,
} from '../../domain/gateways/question-generation.gateway';
import { Question as QuestionInterface } from '../../domain/interfaces/question.interface';
import { ResponseSanitizerHandler } from './sanitizers/response-sanitizer.handler';
import { SanitizerPipelineFactory } from './sanitizers/sanitizer-pipeline.factory';

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
  private readonly sanitizerPipeline: ResponseSanitizerHandler;

  constructor() {
    this.sanitizerPipeline = SanitizerPipelineFactory.create();
  }

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

    const formatted = this.sanitizerPipeline.sanitize(content);
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
}
