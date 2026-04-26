import { Request, Response, NextFunction } from "express";

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		return next();
	}
}
