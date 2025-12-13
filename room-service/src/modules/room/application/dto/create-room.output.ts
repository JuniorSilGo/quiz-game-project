export interface CreateRoomOutput {
  id: number;
  name: string;
  topic: string;
  difficulty: string;
  rounds: number;
  players: number[];
  matchId: string | null;
}
