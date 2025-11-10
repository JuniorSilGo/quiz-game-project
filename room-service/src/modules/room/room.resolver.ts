import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { RoomService } from "./room.service";

@Resolver()
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => String)
  healthCheck() {
    return "RoomService GraphQL OK";
  }

  @Mutation(() => String)
  async createMatch(@Args("roomId") roomId: string) {
    const result = await this.roomService.createMatch(roomId);

    return `Match started: id=${result.matchId} status=${result.status}`;
  }
}
