import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {CreateMatchDto, CreatedMatchOutputDto} from 'src/application/dto/create-match.dto';
import {Match} from 'src/domain/entities/match.entity';
import {MATCH_PORT, type MatchRepositoryPort} from 'src/domain/repositories/match.repository.port';
import {ROUND_DURATION_MS} from './helpers/match.helpers';
import {toCreatedMatchOutputDTO} from 'src/application/mappers/match.mapper';

@Injectable()
export class CreateMatchUseCase {
  constructor(
    @Inject(MATCH_PORT)
    private readonly repository: MatchRepositoryPort,
  ) {
  }

  async execute(input: CreateMatchDto): Promise<CreatedMatchOutputDto> {
    const exists = await Promise.resolve(this.repository.exists(input.roomName));
    if (exists) {
      throw new BadRequestException('Uma partida para essa sala já existe');
    }

    const match = new Match(
      input.roomName,
      input.userId,
      input.userPlayersIds,
      input.questions,
      input.difficulty,
      input.topic,
      1,
    );

    input.userPlayersIds.forEach((id) => match.scores.set(id, 0));
    match.roundEndsAt = new Date(Date.now() + ROUND_DURATION_MS);

    await Promise.resolve(this.repository.save(match));

    return toCreatedMatchOutputDTO(match);
  }
}
