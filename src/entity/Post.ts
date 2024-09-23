import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Publisher } from "./Publisher";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Publisher)
    publisher!: Publisher;

    @Column()
    title!: string;

    @Column({ nullable: true })
    link!: string;

    @Column({ nullable: true })
    imagePath!: string;

    @Column("text")
    textContent!: string;
}
