import { createUserApi } from "@repo/api-client/user.js";
import { mutationOptions } from "@tanstack/react-query";

export const userKeys = {
	all: ["users"] as const,
};

export const userMutations = {
	create: mutationOptions({
		mutationFn: createUserApi,
	}),
};
