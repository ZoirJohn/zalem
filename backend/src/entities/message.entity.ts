import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./conversation.entity";
import { User } from "./user.entity";

@Entity("messages")
export class Message {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(() => Conversation, (conversation) => conversation.messages)
	conversation!: Conversation;

	@ManyToOne(() => User, (user) => user.messages)
	sender!: User;

	@Column()
	content!: string;

	@CreateDateColumn()
	created_at!: Date;
}
