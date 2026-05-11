import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Conversation } from "./conversation.entity";

@Entity("conversation_participants")
export class Participant {
	@PrimaryColumn()
	conversation_id!: string;

	@PrimaryColumn()
	user_id!: string;

	@ManyToOne(() => Conversation, (conversation) => conversation.participants)
	@JoinColumn({ name: "conversation_id" })
	conversation!: Conversation;

	@ManyToOne(() => User, (user) => user.conversations)
	@JoinColumn({ name: "user_id" })
	user!: User;
}
