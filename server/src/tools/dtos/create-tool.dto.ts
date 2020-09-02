import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateToolDto {
  @ApiProperty({
    description: 'The title of the tool',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The link to access the tool',
  })
  @IsString()
  link: string;

  @ApiProperty({
    description: 'Description of the tool',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Tags related to the tool',
  })
  @IsString({ each: true })
  tags: string[];
}
