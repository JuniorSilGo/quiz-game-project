export interface UserOutputDTO {
  id: number;
  username: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface GetUserInputDTO {
  userId: number;
}
