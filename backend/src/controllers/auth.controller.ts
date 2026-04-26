import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ApiError } from "../exceptions/ApiError";
import { validationResult } from "express-validator";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

class AuthController {
	private repository: Repository<User> = AppDataSource.getRepository(User);
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Validation error", errors.array() as unknown as string[]));
			}

			let user = await this.repository.findOneBy({ email: req.body.email });
			if (user) {
				return next(ApiError.Conflict("Email already exists"));
			}

			const display_name = req.body.displayName;
			const email = req.body.email;
			const password = await bcrypt.hash(req.body.password, 12);

			user = this.repository.create({
				display_name,
				email,
				password,
			});

			const { password: hashed, ...newUser } = await this.repository.save(user);
			req.logIn(user, (error) => {
				if (error) return next(error);
				return res.json({ user: newUser });
			});
		} catch (error) {
			return next(error);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		passport.authenticate("local", (error: Error, user: Express.User) => {
			if (error) return next(error);
			if (!user) return next(ApiError.BadRequest("Incorrect email or password"));

			req.login(user, (error) => {
				if (error) return next(error);
				res.json(user);
			});
		})(req, res, next);
	}
	async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
		passport.authenticate("google", {
			scope: ["profile", "email"],
		})(req, res, next);
	}
	async loginWithFacebook(req: Request, res: Response, next: NextFunction) {
		passport.authenticate("facebook", {
			scope: ["profile", "email"],
		})(req, res, next);
	}
	async loginWithGoogleCallback() {
		passport.authenticate("google", {
			failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
		});
	}
	async loginWithFacebookCallback() {
		passport.authenticate("facebook", {
			failureRedirect: `${process.env.FRONTEND_URL}/login?error=facebook_failed`,
		});
	}
}
export default new AuthController();
