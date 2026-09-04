import { Route } from "react-router";
import { Layout } from "./layout/Layout";
import { TopicsPage } from "./topics/page";
import CreateAccountPage from "./users/create/page";
import UsersPage from "./users/page";

export const routes = (
	<Route path="/admin" element={<Layout />}>
		<Route path="/admin/topics" element={<TopicsPage />} />
		<Route path="/admin/users" element={<UsersPage />} />
		<Route path="/admin/users/create" element={<CreateAccountPage />} />
	</Route>
);
