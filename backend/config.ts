import session from "express-session";
import passport from "passport";
import { sessionOptions } from "./src/utils/options";

export const sessionMiddleware = session(sessionOptions);
export const passportInitialize = passport.initialize();
export const passportSession = passport.session();
