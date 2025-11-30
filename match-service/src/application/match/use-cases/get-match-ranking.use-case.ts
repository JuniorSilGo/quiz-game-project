import {Injectable} from '@nestjs/common';
import {MatchDomainService} from '../../../domain/match/services/match-domain.service';
import {GetRankingDto, MatchRankingOutputDto} from '../dto/get-ranking.dto';

@Injectable()
export class GetMatchRankingUseCase {
  constructor(private readonly domain: MatchDomainService) {
  }

  execute(input: GetRankingDto): MatchRankingOutputDto {
    const rankings = this.domain.getRanking(input.roomName);
    return {userRankings: rankings};
  }
}
