import type { AdminAppRoutes } from "@/types/routes";
import { AppLink } from "../../../components/link/AppLink";

export type NavLinkProps = {
	children: React.ReactNode;
	to: AdminAppRoutes;
};

function NavLink(props: NavLinkProps) {
	return (
		<AppLink to={props.to} className="nav-link">
			{props.children}
		</AppLink>
	);
}

export { NavLink };
