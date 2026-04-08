import "dotenv/config";
import express from "express";
import router from "./src/routes";
import cors from "cors";
import ErrorMiddleware from "./src/middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: process.env.CLIENT_URL,
	}),
);
app.use("/api", router);
app.use(ErrorMiddleware)



function bootstrap(PORT: number) {
	app.listen(PORT, () => {
		console.log('SERVER STARTED :)');
	});
}
bootstrap(parseInt(process.env.PORT!));
