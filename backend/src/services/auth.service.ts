import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";
import { ApiError } from "../exceptions/ApiError";
import bcrypt from "bcrypt";

class AuthService {
	private repository: Repository<User> = AppDataSource.getRepository(User);

	async register(email: string, display_name: string, password: string) {
		let user = await this.repository.findOneBy({ email });
		if (user) {
			throw ApiError.Conflict("Email already exists");
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		user = this.repository.create({
			display_name,
			email,
			password: hashedPassword,
		});

		const newUser = await this.repository.save(user);
		return newUser;
	}
}
export default new AuthService();
