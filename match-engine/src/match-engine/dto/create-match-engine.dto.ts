export class CreateMatchEngineDto {
  roomId: number;
  totalRounds?: number;
  timeLimitSec?: number;
}

export class SubmitAnswerDto {
  playerId: number;
  answerId: number;
}

export class GetStateDto {
  roomId: number;
}
