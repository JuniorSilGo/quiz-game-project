import {Injectable} from '@nestjs/common';
import {MatchDomainService} from '../../../domain/match/services/match-domain.service';
import {GetStatusDto, MatchStatusOutputDto} from '../dto/get-status.dto';

@Injectable()
export class GetMatchStatusUseCase {
  constructor(private readonly domain: MatchDomainService) {
  }

  execute(input: GetStatusDto): MatchStatusOutputDto {
    return this.domain.getStatus(input.roomName, input.userId);
  }
}
