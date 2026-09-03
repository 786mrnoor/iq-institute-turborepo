import z from "zod";
import type { InferRequestShape } from "../request.types";
import { userBaseSchema } from "./base.user.schema";

const createUserBody = z.object({
	name: userBaseSchema.shape.name,
	email: userBaseSchema.shape.email,

	password: z
		.string("Enter password")
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter",
		})
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter",
		})
		.regex(/[0-9]/, { message: "Password must contain at least one number" })
		.regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
			message: "Password must contain at least one special character",
		})
		.min(8, { message: "Password must be at least 8 characters long" })
		.max(64, { message: "Password must be at most 64 characters long" }),
	role: userBaseSchema.shape.role.extract(["SUPER_ADMIN", "ADMIN", "TEACHER"]),
});

export const createUserSchema = {
	body: createUserBody,
};

export type CreateUserSchema = InferRequestShape<typeof createUserSchema>;
