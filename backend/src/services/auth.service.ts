import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.serializeUser((user: Express.User, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
	try {
		const user = { id: "" };
		done(null, user);
	} catch (error) {
		done(error);
	}
});

passport.use(
	new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
		try {
			const user = { id: "", password };

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) return done(null, false, { message: "Incorrect username or password" });
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	}),
);
