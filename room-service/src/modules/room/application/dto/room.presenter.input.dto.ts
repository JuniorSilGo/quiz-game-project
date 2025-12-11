export class RoomPresenterInputDto {
  roomName: string;
  topic: string;
  difficulty: string;
  rounds: number;
  players: number[];
  currentRound: number;
  totalRounds: number;
}
