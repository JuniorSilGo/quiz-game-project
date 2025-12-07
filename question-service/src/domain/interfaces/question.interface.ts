export interface Question {
  statement: string;
  alternatives: { [key: string]: string };
  correctAnswer: string;
}
