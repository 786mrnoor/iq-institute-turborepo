import clsx from "clsx";
import type { WebAppRoutes } from "@/types/routes";
import { AppLink } from "../../link/AppLink";

export type NavLinkProps = {
	children: React.ReactNode;
	href: WebAppRoutes;
};

function NavLink(props: NavLinkProps) {
	const classes = clsx(
		"inline-block cursor-pointer bg-gray-100 px-4 py-2.5 text-left text-black",
		"border-0 border-b border-gray-400 outline-transparent transition-all duration-300",
		"md:hover:bg-primary/25 md:hover:text-white",
		"md:rounded-md md:border md:border-white",
	);

	return (
		<AppLink href={props.href} className={classes}>
			{props.children}
		</AppLink>
	);
}

export { NavLink };
