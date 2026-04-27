import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { ApiError } from "../exceptions/ApiError";

class UserController {
	private repository: Repository<User> = AppDataSource.getRepository(User);
	async me(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await this.repository.findOneBy({ id: req.user?.id });
			if (!user) {
				return next(ApiError.NotFound("User not found"));
			}

			return res.json({ user: "" });
		} catch (error) {}
	}
}
export default new UserController();
