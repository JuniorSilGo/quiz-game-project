export interface Question {
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  topic: string;
  difficulty: string;
}
