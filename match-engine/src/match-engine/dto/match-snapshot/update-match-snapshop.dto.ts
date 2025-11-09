import { IsOptional, IsJSON, IsDateString } from 'class-validator';

export class UpdateMatchSnapshotDto {
  @IsOptional()
  @IsJSON()
  state?: any;

  @IsOptional()
  @IsDateString()
  ttlAt?: Date;
}
