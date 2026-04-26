import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../../data-source";

class UserController {
	private repository: Repository<User> = AppDataSource.getRepository(User);
	async me(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await this.repository.findOneBy({ id: req.user.id });
		} catch (error) {}
	}
}
export default new UserController();
