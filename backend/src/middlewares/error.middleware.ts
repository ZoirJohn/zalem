import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/ApiError";

export default function ErrorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
	if (error instanceof ApiError) {
		return res.status(error.statusCode).json({ message: error.message, errors: error.errors });
	}
	res.status(500).json({ message: "Internal server error" });
}
