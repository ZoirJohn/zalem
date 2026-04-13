type UserModel = { id: string };

declare global {
	namespace Express {
		interface User extends UserModel {}
	}
}
export {};
