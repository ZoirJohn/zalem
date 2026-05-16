import "dotenv/config";
import "reflect-metadata";
import "./src/services/passport.service";
import express from "express";
import { passportInitialize, passportSession, sessionMiddleware } from "./config";
import router from "./src/routes";
import cors from "cors";
import morgan from "morgan";
import ErrorMiddleware from "./src/middlewares/error.middleware";
import { ChatController } from "./src/controllers/chat.controller";
import { createServer } from "node:http";
import { corsOptions } from "./src/utils/options";
import { AppDataSource } from "./data-source";

async function bootstrap() {
	const app = express();
	const http = createServer(app);

	app.use(express.json());
	app.use(cors(corsOptions));
	app.use(express.urlencoded({ extended: true }));
	app.use(sessionMiddleware);
	app.use(passportInitialize);
	app.use(passportSession);

	app.use(morgan("tiny"));
	app.use("/api", router);
	app.use(ErrorMiddleware);

	new ChatController(http);
	await AppDataSource.initialize();

	http.listen(parseInt(process.env.PORT!), () => {
		console.log("SERVER STARTED :)");
	});
}
bootstrap();
