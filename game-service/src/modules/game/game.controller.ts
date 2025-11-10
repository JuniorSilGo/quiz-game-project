import { Controller } from "@nestjs/common";
import { GameService } from "./game.service";
import { GrpcMethod } from "@nestjs/microservices";

@Controller()
export class GameController {
    constructor(private readonly gameService: GameService) { }

    @GrpcMethod("GameService", "TrackMatchState")
    async trackMatchState(data: { matchId: string; status: string }) {
        return this.gameService.trackMatchState(data);
    }

    @GrpcMethod("GameService", "SaveMatchResult")
    async saveMatchResult(data: { matchId: string; results: { playerId: string; score: number }[] }) {
        return this.gameService.saveMatchResult(data.matchId, data.results);
    }

    @GrpcMethod("GameService", "ListActiveMatches")
    async listActiveMatches() {
        const matches = await this.gameService.listActiveMatches();
        return { matches };
    }

    async listFinishedMatches() {
        const matches = await this.gameService.listFinishedMatches();
        return { matches };
    }
}