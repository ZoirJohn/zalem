import "dotenv/config";
import express from "express";
import session, { SessionOptions } from "express-session";
import passport from "passport";
import router from "./src/routes";
import cors, { CorsOptions } from "cors";
import ErrorMiddleware from "./src/middlewares/error.middleware";
import { ChatController } from "./src/controllers/chat.controller";
import { createServer } from "node:http";
import { corsOptions, sessionOptions } from "./src/utils/options";

function bootstrap() {
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

	http.listen(parseInt(process.env.PORT!), () => {
		console.log("SERVER STARTED :)");
	});
}
bootstrap();
