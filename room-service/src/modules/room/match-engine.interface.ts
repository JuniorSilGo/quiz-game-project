import { Observable } from "rxjs";

export interface MatchEngineGrpcService {
  createMatch(data: { roomId: string; players: string[] }): Observable<{ matchId: string; status: string }>;
}
