import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GetUserStatsUseCase } from '../../application/use-cases/get-user-stats.usecase';
import { GetRankingUseCase } from '../../application/use-cases/get-ranking.usecase';
import { UserStatsResponseDto } from '../../application/dto/user-stats.dto';

@Resolver()
export class StatisticsResolver {
  constructor(
    private readonly getUserStats: GetUserStatsUseCase,
    private readonly getRanking: GetRankingUseCase
  ) {}

  @Query(() => UserStatsResponseDto)
  userStats(@Args('userId', { type: () => Int }) userId: number) {
    return this.getUserStats.execute(userId);
  }

  @Query(() => [UserStatsResponseDto])
  ranking() {
    return this.getRanking.execute();
  }
}
