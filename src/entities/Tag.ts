import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Post } from './Post';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tagName!: string;

  @Column({ unique: true })
  tagTitle!: string;

  @ManyToMany(() => Post, post => post.tags, { lazy: true })
  posts!: Promise<Post[]>;

  constructor(id?: number, tagName?: string, tagTitle?: string) {
    this.id = id ?? this.id;
    this.tagName = tagName ?? this.tagName;
    this.tagTitle = tagTitle ?? this.tagTitle;
  }
}
