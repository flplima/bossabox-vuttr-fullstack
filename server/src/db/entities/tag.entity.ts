import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Tool } from './tool.entity';
import { User } from './user.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  userId: string;

  @ManyToMany(
    () => Tool,
    tool => tool.tags,
  )
  tools: Tool[];

  @ManyToOne(() => User)
  user: User;
}
