import {Inject, Injectable} from '@nestjs/common';
import * as matchRepositoryPort from '../repositories/match.repository.port';
import {MatchDomainService} from './match-domain.service';

const CHECK_INTERVAL = 300

@Injectable()
export class MatchTimerService {

  constructor(
    private readonly matchDomain: MatchDomainService,
    @Inject(matchRepositoryPort.MATCH_REPOSITORY)
    private readonly repo: matchRepositoryPort.MatchRepositoryPort
  ) {
    this.startTimerLoop();
  }

  private startTimerLoop() {
    setInterval(() => this.checkMatches(), CHECK_INTERVAL);
  }

  private checkMatches() {
    const matches = this.repo.getAll();

    if (!matches) {
      return;
    }

    const now = Date.now();

    for (const match of matches) {
      if (!match.roundEndsAt) {
        continue;
      }

      if (match.roundEndsAt.getTime() <= now) {
        this.matchDomain.forceAdvanceRound(match);
        this.repo.save(match);
      }
    }
  }
}
