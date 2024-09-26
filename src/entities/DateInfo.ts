import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class DateInfo {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Post)
    @JoinColumn()
    post!: Post;

    @Column()
    createdAt!: Date;

    @Column({ nullable: true })
    modifiedAt!: Date;

    @Column({ nullable: true })
    postDate!: Date;

    @Column({ nullable: true })
    expireDate!: Date;
}
