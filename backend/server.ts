import "dotenv/config";
import express from "express";
import router from "./src/routes";
import cors from "cors";
import ErrorMiddleware from "./src/middlewares/error.middleware";
import { ChatController } from "./src/controllers/chat.controller";
import { createServer } from "node:http";

function bootstrap(PORT: number) {
	const app = express();
	const http = createServer(app);

	app.use(express.json());
	app.use(
		cors({
			origin: process.env.CLIENT_URL,
		}),
	);
	app.use("/api", router);
	app.use(ErrorMiddleware);

	new ChatController(http);
	http.listen(PORT, () => {
		console.log("SERVER STARTED :)");
	});
}
bootstrap(parseInt(process.env.PORT!));
