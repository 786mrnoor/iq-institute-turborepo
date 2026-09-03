import { Route } from "react-router";
import { Layout } from "./layout/Layout";
import CreateAccountPage from "./users/create/page";
import UsersPage from "./users/page";

export const routes = (
	<Route path="/admin" element={<Layout />}>
		<Route path="/admin/users" element={<UsersPage />} />
		<Route path="/admin/users/create" element={<CreateAccountPage />} />
	</Route>
);
