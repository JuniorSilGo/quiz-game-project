import { IsInt, IsOptional, IsJSON, IsDateString } from 'class-validator';

export class CreateMatchSnapshotDto {
  @IsInt()
  matchId: number;

  @IsJSON()
  state: any;

  @IsOptional()
  @IsDateString()
  ttlAt?: Date;
}
