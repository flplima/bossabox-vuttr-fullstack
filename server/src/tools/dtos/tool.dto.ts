import { IsString } from 'class-validator';

export class ToolDto {
  @IsString()
  title: string;

  @IsString()
  link: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  tags: string[];
}
