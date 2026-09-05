import { Header } from "@repo/ui/header";
import { Outlet } from "react-router";
import navBg from "@/assets/images/nav-bg.jpg";
import { AppLink } from "@/components/link/AppLink";
import { NavLink } from "./components/NavLink";

function Layout() {
	const homeLink = (
		<AppLink className="outline-none" to="/admin">
			I.Q. Educational Computer Institute
		</AppLink>
	);

	const image = (
		<img
			src={navBg}
			alt="nav-bg"
			className="w-full h-full object-cover object-center"
		/>
	);

	return (
		<>
			<Header homeLink={homeLink} image={image}>
				<NavLink to="/admin/topics">Topics</NavLink>
				<NavLink to="/admin/courses">Courses</NavLink>
				<NavLink to="/admin/enquiries">Enquiries</NavLink>
				<NavLink to="/admin/users">Users</NavLink>
				<NavLink to="/admin">Logout</NavLink>
			</Header>
			<Outlet />
		</>
	);
}

export { Layout };
