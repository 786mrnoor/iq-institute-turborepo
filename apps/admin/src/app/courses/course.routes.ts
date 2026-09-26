import type { RouteObject } from "react-router";

export const courseRoutes: RouteObject[] = [
	{
		index: true,
		handle: { title: "Courses" },
		lazy: async () => {
			const { CoursesPage } = await import("./page");
			return { Component: CoursesPage };
		},
	},
	{
		path: ":id",
		handle: { title: "Course Details" },
		lazy: async () => {
			const { CoursePage } = await import("./[id]/page");
			return { Component: CoursePage };
		},
	},
	{
		path: "add",
		handle: { title: "Add a new course" },
		lazy: async () => {
			const { CreateCoursePage } = await import("./add/page");
			return { Component: CreateCoursePage };
		},
	},
	{
		path: "edit/:id",
		handle: { title: "Update the course" },
		lazy: async () => {
			const { EditCoursePage } = await import("./edit/page");
			return { Component: EditCoursePage };
		},
	},
];
