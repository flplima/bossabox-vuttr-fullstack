import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { TokenService } from './token.service';
import { LoggedUserDto } from './dtos/logged-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmailAndPassword(
      email,
      password,
    );
    const token = this.tokenService.generate(user.id);
    return new LoggedUserDto(user, token);
  }

  async register(data: CreateUserDto) {
    const user = await this.usersService.create(data);
    const token = this.tokenService.generate(user.id);
    return new LoggedUserDto(user, token);
  }
}
