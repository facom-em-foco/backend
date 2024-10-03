import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Publisher } from './Publisher';
import { Tag } from './Tag';
import { DateInfo } from './DateInfo';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Publisher, { eager: true })
  publisher!: Publisher;

  @Column()
  title!: string;

  @Column({ nullable: true })
  link!: string;

  @Column({ nullable: true })
  imagePath!: string;

  @Column('text', { nullable: true })
  textContent!: string;

  @OneToOne(() => DateInfo, { cascade: true, eager: true })
  @JoinColumn()
  dateInfo!: DateInfo;

  @ManyToMany(() => Tag, tag => tag.posts, { eager: true })
  @JoinTable({
    name: 'post_tag',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags!: Tag[];

  constructor(
    id?: number,
    publisher?: Publisher,
    title?: string,
    link?: string,
    imagePath?: string,
    textContent?: string,
    dateInfo?: DateInfo,
    tags?: Tag[],
  ) {
    this.id = id ?? this.id;
    this.publisher = publisher ?? this.publisher;
    this.title = title ?? this.title;
    this.link = link ?? this.link;
    this.imagePath = imagePath ?? this.imagePath;
    this.textContent = textContent ?? this.textContent;
    this.dateInfo = dateInfo ?? this.dateInfo;
    this.tags = tags ?? this.tags;
  }
}
