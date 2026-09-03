import type { WebAppRoutes } from "@/types/routes";
import { AppLink } from "../../link/AppLink";

export type NavLinkProps = {
	children: React.ReactNode;
	href: WebAppRoutes;
};

function NavLink(props: NavLinkProps) {
	return (
		<AppLink href={props.href} className="nav-link">
			{props.children}
		</AppLink>
	);
}

export { NavLink };
