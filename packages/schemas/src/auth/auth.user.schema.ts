import type z from "zod";

import { userBaseSchema } from "../users/base.user.schema";

export const authUserSchema = userBaseSchema.pick({
	id: true,
	name: true,
	email: true,
	role: true,
});

export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthUserInput = z.input<typeof authUserSchema>;
