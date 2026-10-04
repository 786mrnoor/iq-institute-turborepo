import { createBrowserRouter } from "react-router";

import { batchRoutes } from "./batches/batch.routes";
import { courseRoutes } from "./courses/course.routes";
import { enquiryRoutes } from "./enquiries/enquiry.routes";
import { Layout } from "./layout/Layout";
import { NotFoundPage } from "./not-found";
import { studentRoutes } from "./students/student.routes";
import { teacherRoutes } from "./teachers/teacher.routes";
import { topicRoutes } from "./topics/topic.routes";
import { userRoutes } from "./users/user.routes";

export const router = createBrowserRouter([
	{
		path: "/admin",
		Component: Layout,
		children: [
			...topicRoutes,
			{
				path: "courses",
				children: courseRoutes,
			},
			{
				path: "students",
				children: studentRoutes,
			},
			{
				path: "batches",
				children: batchRoutes,
			},
			{
				path: "enquiries",
				children: enquiryRoutes,
			},
			{
				path: "teachers",
				children: teacherRoutes,
			},
			{
				path: "users",
				children: userRoutes,
			},
			{ path: "/admin/*", Component: NotFoundPage },
		],
	},
]);
