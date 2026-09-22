import z from "zod";

import { paginationSchema } from "@repo/schemas/shared/pagination";
import { userBaseSchema } from "@repo/schemas/users/base.user";
import type { CreateUserSchema } from "@repo/schemas/users/create.user";
import type { GetUsersSchema } from "@repo/schemas/users/get.users";
import { customFetch } from "@repo/utils/custom-fetch/custom-fetch.ts";

export const createUserApi = (data: CreateUserSchema["body"]) =>
	customFetch(z.object({ message: z.string() }), {
		path: "/api/users",
		method: "POST",
		body: data,
	});

export const getUsersApi = (data: GetUsersSchema["query"]) =>
	customFetch(
		z.object({ users: userBaseSchema.array(), meta: paginationSchema }),
		{
			path: "/api/users",
			method: "GET",
			query: data,
		},
	);
