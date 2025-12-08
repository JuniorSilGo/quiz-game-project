import {Injectable} from '@nestjs/common';
import {Interval} from '@nestjs/schedule';
import {AdvanceExpiredRoundsUseCase} from '../../application/use-cases/advance-expired-rounds.use-case';

const CHECK_INTERVAL_MS = 300;

@Injectable()
export class MatchTimerService {
  constructor(
    private readonly advanceExpiredRounds: AdvanceExpiredRoundsUseCase,
  ) {
  }

  @Interval(CHECK_INTERVAL_MS)
  handleInterval() {
    return this.advanceExpiredRounds.execute();
  }
}
