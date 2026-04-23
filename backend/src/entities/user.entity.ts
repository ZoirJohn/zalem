import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	display_name!: string;

	@Column({ type: "varchar", nullable: true, unique: true })
	email!: string;

	@Column({ type: "varchar", nullable: true })
	password!: string;

	@Column({ type: "varchar", nullable: true })
	google_id!: string;

	@Column({ type: "varchar", nullable: true })
	facebook_id!: string;

	@Column({ type: "enum", enum: ["god", "user"], default: "user" })
	role!: string;

	@Column({ type: "boolean", default: false })
	is_email_verified!: boolean;

	@Column({ type: "boolean", default: false })
	blocked!: boolean;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}
