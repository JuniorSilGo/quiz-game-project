import { Injectable } from '@nestjs/common';
import { MatchDomainService } from '../../domain/services/match-domain.service';
import { CreateMatchDto, CreatedMatchOutputDto } from '../dto/create-match.dto';

@Injectable()
export class CreateMatchUseCase {
  constructor(private readonly domain: MatchDomainService) {}

  execute(input: CreateMatchDto): CreatedMatchOutputDto {
    const match = this.domain.createMatch(input);
    return {
      roomName: match.roomName,
      currentRound: match.currentRound,
      totalRounds: match.questions.length,
      userPlayersIds: match.userPlayersIds,
      difficulty: match.difficulty,
      topic: match.topic,
    };
  }
}
