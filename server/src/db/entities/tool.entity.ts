import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './tag.entity';
import { Transform, Expose } from 'class-transformer';

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

  @ManyToMany(
    type => Tag,
    tag => tag.tools,
    { eager: true },
  )
  @JoinTable()
  @Transform((value: Tag[]) => value.map(tag => tag.name), {
    toPlainOnly: true,
  })
  tags: Tag[];
}
