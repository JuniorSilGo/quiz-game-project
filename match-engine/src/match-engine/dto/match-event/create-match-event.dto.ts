import { IsInt, IsOptional, IsString, IsJSON } from 'class-validator';

export class CreateMatchEventDto {
  @IsInt()
  matchId: number;

  @IsString()
  type: string;

  @IsJSON()
  payload: any;

  @IsOptional()
  @IsInt()
  emittedBy?: number;
}
