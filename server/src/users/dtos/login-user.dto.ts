import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: "The user's e-mail",
    example: 'john@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "The user's password",
    example: '1234',
  })
  @IsString()
  password: string;
}
