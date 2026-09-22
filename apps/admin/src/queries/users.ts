import { mutationOptions, queryOptions } from "@tanstack/react-query";

import { createUserApi, getUsersApi } from "@repo/api-client/user.js";
import type { GetUsersSchema } from "@repo/schemas/users/get.users";

export const userKeys = {
	all: ["users"] as const,
	lists: () => [...userKeys.all, "list"] as const,
	list: (filters: GetUsersSchema["query"]) =>
		[...userKeys.lists(), filters] as const,
};

export const userQueries = {
	list: (filters: GetUsersSchema["query"]) =>
		queryOptions({
			queryKey: userKeys.list(filters),
			queryFn: () => getUsersApi(filters),
		}),
};

export const userMutations = {
	create: mutationOptions({
		mutationFn: createUserApi,
		onSuccess: (_, __, ___, { client }) => {
			client.resetQueries({ queryKey: userKeys.lists() });
		},
	}),
};
