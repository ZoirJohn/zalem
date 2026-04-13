import { CorsOptions } from "cors";
import { SessionOptions } from "express-session";

export const sessionOptions: SessionOptions = {
	secret: process.env.SESSION_SECRET!,
	resave: false,
	saveUninitialized: true,
	proxy: true,
	cookie: {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		maxAge: 3 * 24 * 60 * 60 * 1000,
	},
};

export const corsOptions: CorsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
};
