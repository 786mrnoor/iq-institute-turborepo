import type { RouteObject } from "react-router";

export const batchRoutes: RouteObject[] = [
	{
		index: true,
		handle: { title: "Batches" },
		lazy: async () => {
			const { BatchesPage } = await import("./page");
			return { Component: BatchesPage };
		},
	},
	{
		path: ":id",
		handle: { title: "Batch Details" },
		lazy: async () => {
			const { BatchPage } = await import("./[id]/page");
			return { Component: BatchPage };
		},
	},
	{
		path: "add",
		handle: { title: "Add Batch" },
		lazy: async () => {
			const { AddBatchPage } = await import("./add/page");
			return { Component: AddBatchPage };
		},
	},
	{
		path: "edit/:id",
		handle: { title: "Update The Batch" },
		lazy: async () => {
			const { EditBatchPage } = await import("./edit/page");
			return { Component: EditBatchPage };
		},
	},
];
