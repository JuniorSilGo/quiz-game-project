export interface AnswerDto {
  roomName: string;
  userId: number;
  answer: string;
}

export interface AnswerOutputDto {
  isRight: boolean;
}
