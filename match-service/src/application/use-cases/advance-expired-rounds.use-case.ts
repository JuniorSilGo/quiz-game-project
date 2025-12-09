import {Inject, Injectable} from '@nestjs/common';
import {MATCH_PORT, type MatchRepositoryPort} from '../../domain/repositories/match.repository.port';
import {advanceRound} from './helpers/match.helpers';

@Injectable()
export class AdvanceExpiredRoundsUseCase {

  constructor(
    @Inject(MATCH_PORT)
    private readonly repository: MatchRepositoryPort,
  ) {
  }

  async execute(): Promise<void> {
    const matches = this.repository.getAll();

    if (!matches) {
      return;
    }

    const now = Date.now();

    for (const match of matches) {
      if (!match.roundEndsAt) {
        continue;
      }

      if (match.roundEndsAt.getTime() <= now) {
        advanceRound(match);
        await Promise.resolve(this.repository.save(match));
      }
    }
  }
}
