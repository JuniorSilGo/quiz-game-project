export class CreateRoomDto {
  roomName!: string;
  userId!: number;
  topic!: string;
  difficulty!: string;
  rounds!: number;
  userPlayersIds?: number[];
}
