import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ApiError } from "../exceptions/ApiError";

class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		passport.authenticate("local", (error: Error, user: Express.User, info: { message: string }) => {
			if (error) return next(error);
			if (!user) return next(ApiError.BadRequest(info.message));

			return res.json({ user });
		})(req, res, next);
	}
}
export default new AuthController();
