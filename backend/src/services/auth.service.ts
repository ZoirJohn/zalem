import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { ApiError } from "../exceptions/ApiError";

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
	new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
		try {
			const user = { id: "", password };
			if (!user) return done(null, false, { message: "Invalid credentials" });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return done(null, false, { message: "Invalid credentials" });
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	}),
);

passport.use(
	new GoogleStrategy({ clientID: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET!, callbackURL: process.env.GOOGLE_CALLBACK_URL! }, async (accessToken, refreshToken, profile, done) => {
		try {
			const email = profile.emails?.[0].value;
			if (!email) return done(ApiError.BadRequest("No verified email from Google"), false);

			const existingUser = { id: "" };
			if (existingUser) {
				const updated = { id: "" };
				return done(null, updated);
			}

			const newUser = { id: "" };
			return done(null, newUser);
		} catch (error) {
			return done(error);
		}
	}),
);

passport.use(
	new FacebookStrategy({ clientID: process.env.FACEBOOK_CLIENT_ID!, clientSecret: process.env.FACEBOOK_CLIENT_SECRET!, callbackURL: process.env.FACEBOOK_CALLBACK_URL! }, async (accessToken, refreshToken, profile, done) => {
		try {
			const email = profile.emails?.[0].value;
			if (!email) return done(ApiError.BadRequest("No verified email from Facebook"), false);

			const existingUser = { id: "" };
			if (existingUser) {
				const updated = { id: "" };
				return done(null, updated);
			}

			const newUser = { id: "" };
			return done(null, newUser);
		} catch (error) {
			return done(error);
		}
	}),
);

export default passport;
