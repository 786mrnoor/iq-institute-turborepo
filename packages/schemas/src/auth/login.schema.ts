import z from "zod";
import type { InferRequestShape } from "../request.types";
import { userBaseSchema } from "../users/base.user.schema";

const loginBody = z.object({
	email: userBaseSchema.shape.email,
	password: z
		.string("Enter Password")
		.min(8, { message: "Password must be at least 8 characters long" })
		.max(64, { message: "Password must be at most 64 characters long" }),
});

export const loginSchema = {
	body: loginBody,
};

export type LoginData = InferRequestShape<typeof loginSchema>;
