import { Route } from "react-router";
import { CoursePage } from "./courses/[id]/page";
import { CreateCoursePage } from "./courses/add/page";
import { EditCoursePage } from "./courses/edit/page";
import { CoursesPage } from "./courses/page";
import { EnquiriesPage } from "./enquiries/page";
import { Layout } from "./layout/Layout";
import { NotFoundPage } from "./not-found";
import { AddStudentPage } from "./students/add/page";
import { EditStudentPage } from "./students/edit/page";
import { StudentsPage } from "./students/page";
import { TopicsPage } from "./topics/page";
import CreateAccountPage from "./users/create/page";
import UsersPage from "./users/page";

export const routes = (
	<Route path="/admin" element={<Layout />}>
		<Route path="topics" element={<TopicsPage />} />

		<Route path="courses" element={<CoursesPage />} />
		<Route path="courses/:id" element={<CoursePage />} />
		<Route path="courses/add" element={<CreateCoursePage />} />
		<Route path="courses/edit/:id" element={<EditCoursePage />} />

		<Route path="students" element={<StudentsPage />} />
		<Route path="students/add" element={<AddStudentPage />} />
		<Route path="students/edit/:id" element={<EditStudentPage />} />

		<Route path="enquiries" element={<EnquiriesPage />} />

		<Route path="users" element={<UsersPage />} />
		<Route path="users/create" element={<CreateAccountPage />} />

		<Route path="/admin/*" element={<NotFoundPage />} />
	</Route>
);
