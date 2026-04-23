import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ nullable: true })
	display_name!: string;

	@Column({ nullable: true, unique: true })
	email!: string;

	@Column({ nullable: true })
	password!: string;

	@Column({ nullable: true })
	google_id!: string;

	@Column({ nullable: true })
	facebook_id!: string;

	@Column({ type: "enum", enum: ["god", "user"], default: "user" })
	role!: string;

	@Column({ default: false })
	is_email_verified!: boolean;

	@Column({ default: false })
	blocked!: boolean;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}
