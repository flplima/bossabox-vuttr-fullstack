import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Tool } from './tool.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(
    type => Tool,
    tool => tool.tags,
  )
  tools: Tool[];
}
