import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GenerateQuestionDto } from '../../../application/dto/generate-question.dto';
import { GenerateQuestionsUseCase } from '../../../application/use-cases/generate-questions.use-case';

@Controller()
export class QuestionController {
  constructor(private readonly generateQuestionsUseCase: GenerateQuestionsUseCase) {}

  @GrpcMethod('QuestionService', 'GenerateQuestions')
  async generateQuestions(data: GenerateQuestionDto) {
    return this.generateQuestionsUseCase.execute(data);
  }
}
