import type { RouteObject } from "react-router";

export const userRoutes: RouteObject[] = [
	{
		index: true,
		handle: { title: "Users" },
		lazy: async () => {
			const { UsersPage } = await import("./page");
			return { Component: UsersPage };
		},
	},
	{
		path: "create",
		handle: { title: "Create User" },
		lazy: async () => {
			const { CreateAccountPage } = await import("./create/page");
			return { Component: CreateAccountPage };
		},
	},
];
