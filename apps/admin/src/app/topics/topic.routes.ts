import type { RouteObject } from "react-router";

export const topicRoutes: RouteObject[] = [
	{
		path: "topics",
		handle: { title: "Topics" },
		lazy: async () => {
			const { TopicsPage } = await import("./page");
			return { Component: TopicsPage };
		},
	},
];
