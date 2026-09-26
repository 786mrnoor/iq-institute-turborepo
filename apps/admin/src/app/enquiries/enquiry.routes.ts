import type { RouteObject } from "react-router";

export const enquiryRoutes: RouteObject[] = [
	{
		index: true,
		handle: { title: "Enquiries" },
		lazy: async () => {
			const { EnquiriesPage } = await import("./page");
			return { Component: EnquiriesPage };
		},
	},
];
