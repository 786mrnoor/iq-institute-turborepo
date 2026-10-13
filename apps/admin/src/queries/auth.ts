import { mutationOptions, queryOptions } from "@tanstack/react-query";

import { logoutApi, meApi } from "@repo/api-client/auth.ts";

export const authKeys = {
	all: ["auth"] as const,

	me: () => [...authKeys.all, "me"] as const,
};

export const authQueries = {
	me: queryOptions({
		queryKey: authKeys.me(),
		queryFn: () => meApi(),
	}),
};

export const authMutations = {
	logout: mutationOptions({
		mutationFn: logoutApi,
		onSuccess(_, __, ___, { client }) {
			client.invalidateQueries({ queryKey: authKeys.me() });
		},
	}),
};
