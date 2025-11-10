import { IsInt, IsOptional, IsString, IsJSON } from 'class-validator';

export class UpdateMatchEventDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsJSON()
  payload?: any;

  @IsOptional()
  @IsInt()
  emittedBy?: number;
}
