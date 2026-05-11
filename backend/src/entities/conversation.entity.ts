import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Participant } from "./participant.entity";
import { Message } from "./message.entity";

@Entity("conversations")
export class Conversation {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@CreateDateColumn()
	created_at!: Date;

	@OneToMany(() => Participant, (participant) => participant.conversation)
	participants!: Participant[];

	@OneToMany(() => Message, (message) => message.conversation)
	messages!: Message[];
}
