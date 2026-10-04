import type { RouteObject } from "react-router";

export const teacherRoutes: RouteObject[] = [
	{
		index: true,
		handle: { title: "Teachers" },
		lazy: async () => {
			const { TeachersPage } = await import("./page");
			return { Component: TeachersPage };
		},
	},
	{
		path: "add",
		handle: { title: "Add a teacher" },
		lazy: async () => {
			const { AddTeacherPage } = await import("./add/page");
			return { Component: AddTeacherPage };
		},
	},
	{
		path: "edit/:id",
		handle: { title: "Update the teacher" },
		lazy: async () => {
			const { EditTeacherPage } = await import("./edit/page");
			return { Component: EditTeacherPage };
		},
	},
];
