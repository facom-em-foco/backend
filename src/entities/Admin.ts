import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Publisher } from './Publisher';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Publisher, { eager: true })
  @JoinColumn()
  publisher!: Publisher;
}
