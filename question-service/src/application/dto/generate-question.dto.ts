export class GenerateQuestionDto {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  quantity?: number;
}
