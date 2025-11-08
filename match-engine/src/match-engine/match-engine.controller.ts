import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MatchEngineService } from './match-engine.service';
import { CreateMatchEngineDto, SubmitAnswerDto, GetStateDto } from './dto/create-match-engine.dto';

@Controller()
export class MatchEngineController {
  constructor(private readonly service: MatchEngineService) {}

  @GrpcMethod('MatchEngineService', 'StartMatch')
  startMatch(dto: CreateMatchEngineDto) {
    return this.service.startMatch(dto);
  }

  @GrpcMethod('MatchEngineService', 'SubmitAnswer')
  submitAnswer(dto: SubmitAnswerDto) {
    return this.service.submitAnswer(dto);
  }

  @GrpcMethod('MatchEngineService', 'GetState')
  getState(dto: GetStateDto) {
    return this.service.getState(dto);
  }
}
