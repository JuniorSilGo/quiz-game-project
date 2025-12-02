import { Observable } from 'rxjs';

export interface MatchService {
  CreateMatch(payload: {
    roomId: number;
    players: { userId: number }[];
  }): Observable<any>;
}

export interface AuthService {
  GetUserById(payload: { userId: number }): Observable<any>;
}