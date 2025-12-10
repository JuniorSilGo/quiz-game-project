export interface GenerateQuestionsInput {
  topic: string;
  difficulty: string;
  quantity: number;
}

export interface GeneratedQuestion {
  statement: string;
  alternatives: Record<string, string>;
  correctAnswer: string;
}

export interface QuestionsPort {
  generateQuestions(
    input: GenerateQuestionsInput,
  ): Promise<GeneratedQuestion[]>;
}
