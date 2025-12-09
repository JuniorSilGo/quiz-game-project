import {Inject, Injectable} from '@nestjs/common';
import {GetRankingDto, MatchRankingOutputDto} from 'src/application/dto/get-ranking.dto';
import {MATCH_PORT, type MatchRepositoryPort} from 'src/domain/repositories/match.repository.port';
import {getMatchOrThrow} from './helpers/match.helpers';
import {toMatchRankingOutputDTO} from 'src/application/mappers/match.mapper';

@Injectable()
export class GetMatchRankingUseCase {
  constructor(
    @Inject(MATCH_PORT)
    private readonly repository: MatchRepositoryPort,
  ) {
  }

  async execute(input: GetRankingDto): Promise<MatchRankingOutputDto> {
    const match = await getMatchOrThrow(this.repository, input.roomName);

    return toMatchRankingOutputDTO(match);
  }
}
