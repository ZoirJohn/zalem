import "dotenv/config";
import "reflect-metadata";
import "./src/services/passport.service";
import express from "express";
import session from "express-session";
import passport from "passport";
import router from "./src/routes";
import cors from "cors";
import ErrorMiddleware from "./src/middlewares/error.middleware";
import { ChatController } from "./src/controllers/chat.controller";
import { createServer } from "node:http";
import { corsOptions, sessionOptions } from "./src/utils/options";
import { AppDataSource } from "./data-source";

async function bootstrap() {
	const app = express();
	const http = createServer(app);

	app.use(express.json());
	app.use(cors(corsOptions));
	app.use(express.urlencoded({ extended: true }));
	app.use(session(sessionOptions));
	app.use(passport.initialize());
	app.use(passport.session());

	app.use("/api", router);
	app.use(ErrorMiddleware);

	new ChatController(http);
	await AppDataSource.initialize();

	http.listen(parseInt(process.env.PORT!), () => {
		console.log("SERVER STARTED :)");
	});
}
bootstrap();
