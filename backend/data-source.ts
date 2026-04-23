import { DataSource } from "typeorm";
import { User } from "./src/entities/user.entity";

export const AppDataSource = new DataSource({
	type: "postgres",
	synchronize: true,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT!),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [User],
});
