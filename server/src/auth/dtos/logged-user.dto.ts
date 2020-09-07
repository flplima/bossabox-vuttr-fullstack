import { User } from 'src/db/entities/user.entity';

export class LoggedUserDto {
  constructor(public user: User, public token: string) {}
}
