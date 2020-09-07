import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Returns the registered user and a token' })
  @ApiResponse({
    status: 200,
    description: 'The user is registered and password is correct',
  })
  @ApiResponse({
    status: 422,
    description: 'E-mail is not registered',
  })
  @ApiResponse({
    status: 401,
    description: 'E-mail is registered, but the password is incorrect',
  })
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Create a user and returns the user and a token' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'E-mail is already registered',
  })
  @ApiResponse({ status: 400, description: 'Malformed body request syntax.' })
  register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
}
