import { Header } from "@repo/ui/header";
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
		<Header homeLink={homeLink} image={image}>
			<NavLink to="/admin">Users</NavLink>
			<NavLink to="/admin">Logout</NavLink>
		</Header>
	);
}

export { Layout };
