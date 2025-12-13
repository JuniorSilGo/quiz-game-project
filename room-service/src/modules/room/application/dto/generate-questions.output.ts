export interface GenerateQuestionsOutput {
  questions: {
    statement: string;
    alternatives: Record<string, string>;
    correctAnswer: string;
  }[];
}
