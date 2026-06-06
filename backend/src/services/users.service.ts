import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";

class UsersService {
    private users = AppDataSource.getRepository<User>(User);
    async getUsers(userId: string) {
        const users = await this.users
            .createQueryBuilder("u")
            .select(["u.id", "u.display_name", "u.updated_at", "u.created_at"])
            .where("u.id<>:id", { id: userId })
            .getMany();
        return users;
    }
}
export default new UsersService();
