import z from "zod";

export const loginSchema = z.object({
	email: z.email("Invalid email address").trim().toLowerCase(),

	password: z
		.string("Enter Password")
		.min(8, { message: "Password must be at least 8 characters long" })
		.max(64, { message: "Password must be at most 64 characters long" }),
});

export type LoginData = z.infer<typeof loginSchema>;
export type LoginInput = z.input<typeof loginSchema>;
