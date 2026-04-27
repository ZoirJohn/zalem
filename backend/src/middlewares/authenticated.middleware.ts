import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/ApiError";

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		return next();
	}
	throw ApiError.UnauthorizedError();
}
