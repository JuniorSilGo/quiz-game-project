export interface GeneratedQuestion {
  statement: string;
  alternatives: Record<string, string>;
  correctAnswer: string;
}
