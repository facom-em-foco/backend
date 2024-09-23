import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Publisher {
    @PrimaryColumn()
    id!: number;

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

    @Column()
    name!: string;

    @Column()
    emailAddress!: string;

    @Column()
    registeredAt!: Date;

    @Column({ default: true })
    active!: boolean;
}
