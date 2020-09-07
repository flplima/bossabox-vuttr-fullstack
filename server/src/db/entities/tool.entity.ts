import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Tag } from './tag.entity';
import { Transform } from 'class-transformer';
import { User } from './user.entity';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @Column('uuid')
  userId: string;

  @ManyToMany(
    () => Tag,
    tag => tag.tools,
    { eager: true },
  )
  @JoinTable()
  @Transform((value: Tag[]) => value.map(tag => tag.name))
  tags: Tag[];

  @ManyToOne(() => User)
  user: User;
}
