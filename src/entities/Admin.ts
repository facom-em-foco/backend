import { Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Publisher } from "./Publisher";

@Entity()
export class Admin {
    @PrimaryColumn()
    id!: number;

    @OneToOne(() => Publisher)
    @JoinColumn()
    publisher!: Publisher;
}
