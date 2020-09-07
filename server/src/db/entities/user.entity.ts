import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { hash } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.passwordHash = await hash(this.password, 4);
  }
}
