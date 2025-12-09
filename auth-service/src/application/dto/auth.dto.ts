export interface RegisterUserInputDTO {
  username: string;
  email: string;
  password: string;
}

export interface LoginInputDTO {
  usernameOrEmail: string;
  password: string;
}

export interface TokenPayloadDTO {
  sub: string;
  username: string;
  email: string;
  iss: string;
}

export interface IssueTokenInputDTO {
  id: number;
  username: string;
  email: string;
}

export interface IssueTokenOutputDTO {
  token: string;
  payload: TokenPayloadDTO;
}

export interface ValidateTokenInputDTO {
  token: string;
}

export interface ValidateTokenOutputDTO {
  valid: boolean;
  reason?: string;
  sub?: string;
  username?: string;
  email?: string;
}
