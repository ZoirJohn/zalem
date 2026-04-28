import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ApiError } from "../exceptions/ApiError";
import AuthService from "../services/auth.service";
import { UserDTO } from "../dtos/user.dto";

class AuthController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, display_name, password } = req.body;
			const user = await AuthService.register(email, display_name, password);

			req.logIn(user, (error) => {
				if (error) return next(error);
				return res.json({ user: new UserDTO(user) });
			});
		} catch (error) {
			return next(error);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		passport.authenticate("local", (error: Error, user: Express.User) => {
			if (error) return next(error);
			if (!user) return next(ApiError.BadRequest("Incorrect email or password"));

			req.logIn(user, (error) => {
				if (error) return next(error);
				res.json({ user: new UserDTO(user) });
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
			scope: ["public_profile", "email"],
		})(req, res, next);
	}
	async loginWithGoogleCallback(req: Request, res: Response, next: NextFunction) {
		passport.authenticate("google", {
			failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
		})(req, res, next);
	}
	async loginWithFacebookCallback(req: Request, res: Response, next: NextFunction) {
		passport.authenticate("facebook", {
			failureRedirect: `${process.env.FRONTEND_URL}/login?error=facebook_failed`,
		})(req, res, next);
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
