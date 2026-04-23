import { User as UserModel } from "../entities/user.entity";

declare global {
	namespace Express {
		interface User extends UserModel {}
	}
}
export {};
