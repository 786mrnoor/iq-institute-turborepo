import type { CreateUserSchema } from "@repo/schemas/users/create.user";
import { customFetch } from "@repo/utils/custom-fetch/custom-fetch.js";
import z from "zod";

export const createUserApi = (data: CreateUserSchema["body"]) =>
	customFetch(z.object({ message: z.string() }), {
		path: "/api/users",
		method: "POST",
		body: data,
	});
