import { Question as QuestionInterface } from '../interfaces/question.interface';

export interface GenerateQuestionsGatewayParams {
  prompt: string;
  apiKey: string;
  model: string;
}

export interface GenerateQuestionsGatewayResult {
  raw: string;
  questions: QuestionInterface[] | null;
}

export abstract class QuestionGenerationGateway {
  abstract generateQuestions(
    params: GenerateQuestionsGatewayParams,
  ): Promise<GenerateQuestionsGatewayResult>;
}
