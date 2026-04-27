import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ApiError } from "../exceptions/ApiError";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

class AuthController {
	private repository: Repository<User> = AppDataSource.getRepository(User);
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, display_name, password: unhashedPassword } = req.body;
			const password = await bcrypt.hash(unhashedPassword, 12);

			let user = await this.repository.findOneBy({ email });
			if (user) {
				return next(ApiError.Conflict("Email already exists"));
			}

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
				const { password, ...safeUser } = user;
				res.json(safeUser);
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
	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			req.logOut((error) => {
				if (error) {
					return next(error);
				}
				req.session.destroy((error) => {
					if (error) {
						return next(error);
					}
					return res.json({ message: "Logout successful" });
				});
			});
		} catch (error) {
			return next(error);
		}
	}
}
export default new AuthController();
