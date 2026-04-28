import { User } from "../entities/user.entity";

export class UserDTO {
	id: string;
	display_name: string | null;
	email: string | null;
	google_id: string | null;
	facebook_id: string | null;
	role: string;
	is_email_verified: boolean;
	blocked: boolean;
	created_at: Date;
	updated_at: Date;

	constructor(user: User) {
		this.id = user.id;
		this.display_name = user.display_name ?? null;
		this.email = user.email ?? null;
		this.google_id = user.google_id ?? null;
		this.facebook_id = user.facebook_id ?? null;
		this.role = user.role;
		this.is_email_verified = user.is_email_verified;
		this.blocked = user.blocked;
		this.created_at = user.created_at;
		this.updated_at = user.updated_at;
	}
}
