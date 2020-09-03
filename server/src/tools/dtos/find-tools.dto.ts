import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindToolsDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  @Transform((value: any) => value === 'true' || value === '1')
  tagsOnly: boolean;
}