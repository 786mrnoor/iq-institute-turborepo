import type { RouteObject } from "react-router";

export const studentRoutes: RouteObject[] = [
	{
		index: true,
		handle: { title: "Students" },
		lazy: async () => {
			const { StudentsPage } = await import("./page");
			return { Component: StudentsPage };
		},
	},
	{
		path: "add",
		handle: { title: "Register student" },
		lazy: async () => {
			const { AddStudentPage } = await import("./add/page");
			return { Component: AddStudentPage };
		},
	},
	{
		path: "edit/:id",
		handle: { title: "Update the student" },
		lazy: async () => {
			const { EditStudentPage } = await import("./edit/page");
			return { Component: EditStudentPage };
		},
	},
];
