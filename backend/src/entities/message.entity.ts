import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./conversation.entity";
import { User } from "./user.entity";

@Entity("messages")
export class Message {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(() => Conversation, (conversation) => conversation.messages, { onDelete: "CASCADE" })
	@JoinColumn({ name: "conversation_id" })
	conversation!: Conversation;

	@ManyToOne(() => User, (user) => user.messages, { onDelete: "CASCADE" })
	@JoinColumn({ name: "sender_id" })
	sender!: User;

	@Column()
	content!: string;

	@CreateDateColumn()
	created_at!: Date;
}
