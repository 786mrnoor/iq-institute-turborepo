import type { CreateUserSchema } from "@repo/schemas/users/create.user";

export const DEFAULT_VALUES: CreateUserSchema["body"] = {
	name: "",
	email: "",
	password: "",
	role: "admin",
};
