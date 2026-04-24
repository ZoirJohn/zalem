import bcrypt from "bcrypt";
import passport, { Profile } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { ApiError } from "../exceptions/ApiError";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

const userRepository = AppDataSource.getRepository(User);

passport.serializeUser((user: Express.User, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
	try {
		const user = await userRepository.findOneBy({ id });
		if (!user) return done(null, false);
		done(null, user);
	} catch (error) {
		done(error);
	}
});

type OAuthDone = (error: any, user?: Express.User | false) => void;
async function handleOAuthLogin(repository: Repository<User>, profile: Profile, id: "google_id" | "facebook_id", done: OAuthDone) {
	try {
		const email = profile.emails?.[0].value;
		if (!email) return done(ApiError.BadRequest("No verified email from " + (id == "google_id" ? "Google" : "Facebook")));

		let user = await repository.findOneBy({ email });
		if (user) {
			if (user.blocked) return done(null, false);

			user[id] = profile.id;
			const updatedUser = await repository.save(user);
			return done(null, updatedUser);
		}

		user = repository.create({
			[id]: profile.id,
			display_name: profile.displayName,
			email,
		});
		const savedUser = await repository.save(user);
		return done(null, savedUser);
	} catch (error) {
		return done(error, false);
	}
}

passport.use(
	new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
		try {
			const user = await userRepository.findOneBy({ email });
			if (!user) return done(null, false);

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return done(null, false);
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	}),
);

passport.use(new GoogleStrategy({ clientID: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET!, callbackURL: process.env.GOOGLE_CALLBACK_URL! }, async (_, __, profile, done) => await handleOAuthLogin(userRepository, profile, "google_id", done)));

passport.use(new FacebookStrategy({ clientID: process.env.FACEBOOK_CLIENT_ID!, clientSecret: process.env.FACEBOOK_CLIENT_SECRET!, callbackURL: process.env.FACEBOOK_CALLBACK_URL! }, async (_, __, profile, done) => await handleOAuthLogin(userRepository, profile, "facebook_id", done)));

export default passport;
