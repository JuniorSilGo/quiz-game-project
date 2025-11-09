import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { QuestionService } from './question.service';
import { GenerateQuestionDto } from './dto/generate-question.dto';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @GrpcMethod('QuestionService', 'GenerateQuestions')
  async generateQuestions(data: GenerateQuestionDto) {
    return this.questionService.generateQuestions(data);
  }
}
