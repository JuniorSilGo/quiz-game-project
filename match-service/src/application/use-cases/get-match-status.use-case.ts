import {Inject, Injectable} from '@nestjs/common';
import {GetStatusDto, MatchStatusOutputDto} from 'src/application/dto/get-status.dto';
import {MATCH_PORT, type MatchRepositoryPort} from 'src/domain/repositories/match.repository.port';
import {getMatchOrThrow} from './helpers/match.helpers';
import {toMatchStatusOutputDTO} from 'src/application/mappers/match.mapper';

@Injectable()
export class GetMatchStatusUseCase {
  constructor(
    @Inject(MATCH_PORT)
    private readonly repository: MatchRepositoryPort,
  ) {
  }

  async execute(input: GetStatusDto): Promise<MatchStatusOutputDto> {
    const match = await getMatchOrThrow(this.repository, input.roomName);
    return toMatchStatusOutputDTO(match);
  }
}
