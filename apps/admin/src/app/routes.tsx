import { Route } from "react-router";
import { CoursePage } from "./courses/[id]/page";
import { CreateCoursePage } from "./courses/add/page";
import { EditCoursePage } from "./courses/edit/page";
import { CoursesPage } from "./courses/page";
import { Layout } from "./layout/Layout";
import { TopicsPage } from "./topics/page";
import CreateAccountPage from "./users/create/page";
import UsersPage from "./users/page";

export const routes = (
	<Route path="/admin" element={<Layout />}>
		<Route path="/admin/topics" element={<TopicsPage />} />

		<Route path="/admin/courses" element={<CoursesPage />} />
		<Route path="/admin/courses/:id" element={<CoursePage />} />
		<Route path="/admin/courses/add" element={<CreateCoursePage />} />
		<Route path="/admin/courses/edit/:id" element={<EditCoursePage />} />

		<Route path="/admin/users" element={<UsersPage />} />
		<Route path="/admin/users/create" element={<CreateAccountPage />} />
	</Route>
);
