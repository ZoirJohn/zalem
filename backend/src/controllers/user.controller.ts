import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { ApiError } from "../exceptions/ApiError";
import { UserDTO } from "../dtos/user.dto";

class UserController {
	private repository: Repository<User> = AppDataSource.getRepository(User);
	async users(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await this.repository.find({
				select: {
					id: true,
					display_name: true,
					updated_at: true,
					created_at: true,
				},
			});

			return res.json({ users });
		} catch (error) {
			next(error);
		}
	}
	async me(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await this.repository.findOneBy({ id: req.user?.id });
			if (!user) {
				return next(ApiError.NotFound("User not found"));
			}

			return res.json({ user: new UserDTO(user) });
		} catch (error) {
			next(error);
		}
	}
}
export default new UserController();
