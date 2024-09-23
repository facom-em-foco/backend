import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Post } from "./Post";
import { Tag } from "./Tag";

@Entity()
export class PostTag {
    @PrimaryColumn()
    postId!: number;

    @PrimaryColumn()
    tagId!: number;

    @ManyToOne(() => Post)
    @JoinColumn({ name: "postId" })
    post!: Post;

    @ManyToOne(() => Tag)
    @JoinColumn({ name: "tagId" })
    tag!: Tag;
}
