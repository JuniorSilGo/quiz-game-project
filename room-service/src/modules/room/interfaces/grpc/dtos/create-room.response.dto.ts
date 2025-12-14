export interface CreateRoomResponseDto {
  id: number;
  name: string;
  status: string;
  userOwnerId: number;
  userPlayersId: number[];
  matchQtd: number;
  topic: string;
  difficulty: string;
  rounds: number;
  matchId: string;
  maxPlayers: number;
  currentPlayers: number;
}
