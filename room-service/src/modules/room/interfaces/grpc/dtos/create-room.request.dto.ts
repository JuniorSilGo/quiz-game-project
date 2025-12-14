export interface CreateRoomRequestDto {
  roomName: string;
  userId: number;
  topic: string;
  difficulty: string;
  rounds: number;
  userPlayersIds: number[];
  maxPlayers?: number;
}
