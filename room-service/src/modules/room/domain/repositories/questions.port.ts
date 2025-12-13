import { GenerateQuestionsInput } from '../../application/dto/generate-questions.input';
import { GenerateQuestionsOutput } from '../../application/dto/generate-questions.output';

export interface QuestionsPort {
  generateQuestions(
    input: GenerateQuestionsInput,
  ): Promise<GenerateQuestionsOutput>;
}
