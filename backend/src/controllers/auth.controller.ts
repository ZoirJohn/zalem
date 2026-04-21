import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ApiError } from "../exceptions/ApiError";
import { validationResult } from "express-validator";

class AuthController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Validation error", errors.array() as unknown as string[]));
			}

			return res.json({ message: "User created successfully" });
		} catch (error) {
			return next(error);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		passport.authenticate("local", (error: Error, user: Express.User, info: { message: string }) => {
			if (error) return next(error);
			if (!user) return next(ApiError.BadRequest(info.message));

			req.login(user, (error) => {
				if (error) return next(error);
				res.json(user);
			});
		})(req, res, next);
	}
	async loginWithGoogle() {
		passport.authenticate("google", {
			scope: ["profile", "email"],
		});
	}
	async loginWithFacebook() {
		passport.authenticate("facebook", {
			scope: ["profile", "email"],
		});
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
