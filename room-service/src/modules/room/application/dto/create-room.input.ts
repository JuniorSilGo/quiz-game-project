export interface CreateRoomInput {
  name: string;
  topic: string;
  difficulty: string;
  rounds: number;
  createdById: number;
  players?: number[];
}
