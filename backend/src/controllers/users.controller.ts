import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { ApiError } from "../exceptions/ApiError";
import { UserDTO } from "../dtos/user.dto";
import UsersService from "../services/users.service";

class UserController {
    private repository: Repository<User> = AppDataSource.getRepository(User);
    async users(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UsersService.getUsers(req.user?.id as string);

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
