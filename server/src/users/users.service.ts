import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

import { User } from 'src/db/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const userCount = await this.usersRepository.count({ email: data.email });
    if (userCount) {
      throw new UnprocessableEntityException('E-mail is already registered');
    }
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      email,
    });
    if (!user) {
      throw new UnprocessableEntityException('E-mail is not registered');
    }
    if (!(await compare(password, user.passwordHash))) {
      throw new UnauthorizedException(`Incorrect password`);
    }
    return user;
  }
}
