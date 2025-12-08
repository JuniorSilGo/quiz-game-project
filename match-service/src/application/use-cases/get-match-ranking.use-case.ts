import {Inject, Injectable} from '@nestjs/common';
import {GetRankingDto, MatchRankingOutputDto} from '../dto/get-ranking.dto';
import {MATCH_PORT, type MatchRepositoryPort} from '../../domain/repositories/match.repository.port';
import {getMatchOrThrow} from './helpers/match.helpers';

@Injectable()
export class GetMatchRankingUseCase {
  constructor(
    @Inject(MATCH_PORT)
    private readonly repository: MatchRepositoryPort,
  ) {
  }

  async execute(input: GetRankingDto): Promise<MatchRankingOutputDto> {
    const match = await getMatchOrThrow(this.repository, input.roomName);

    const rankings = Array.from(match.scores.entries())
    .map(([userId, score]) => ({userId, score}))
    .sort((a, b) => b.score - a.score);

    return {userRankings: rankings};
  }
}
