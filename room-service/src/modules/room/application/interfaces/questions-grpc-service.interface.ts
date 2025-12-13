import { Observable } from 'rxjs';

export interface QuestionsGrpcService {
  GenerateQuestions(data: {
    topic: string;
    difficulty: string;
    quantity: number;
  }): Observable<{
    questions: {
      statement: string;
      alternatives: Record<string, string>;
      correctAnswer: string;
    }[];
  }>;
}
