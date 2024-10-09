import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';

@Entity()
export class DateInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postDate!: Date;

  @Column({ nullable: true })
  expireDate!: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt!: Date;

  @OneToOne(() => Post, post => post.dateInfo, { onDelete: 'CASCADE' })
  @JoinColumn()
  post!: Post;

  constructor(
    id?: number,
    postDate?: Date,
    expireDate?: Date,
    createdAt?: Date,
    modifiedAt?: Date,
  ) {
    this.id = id ?? this.id;
    this.postDate = postDate ?? this.postDate;
    this.expireDate = expireDate ?? this.expireDate;
    this.createdAt = createdAt ?? this.createdAt;
    this.modifiedAt = modifiedAt ?? this.modifiedAt;
  }
}
