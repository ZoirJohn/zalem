import { DataSource } from "typeorm";
import { User } from "./src/entities/user.entity";
import { Conversation } from "./src/entities/conversation.entity";
import { Participant } from "./src/entities/participant.entity";
import { Message } from "./src/entities/message.entity";

export const AppDataSource = new DataSource({
	type: "postgres",
	synchronize: false,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT!),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [User, Conversation, Participant, Message],
});
