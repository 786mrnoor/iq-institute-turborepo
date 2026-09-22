import clsx from "clsx";
import type { MouseEvent } from "react";
import { NavLink } from "react-router";

import type { AdminAppRoutes } from "@/types/routes";

export type HeaderLinkProps = {
	children: React.ReactNode;
	icon: React.ReactNode;
	to: AdminAppRoutes | "void";
	className?: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

function HeaderLink({
	children,
	icon,
	to,
	className,
	onClick,
}: HeaderLinkProps) {
	function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		onClick?.(event);

		if (to === "void") {
			event.preventDefault();
		}
	}

	return (
		<NavLink
			to={to}
			onClick={handleClick}
			className={clsx("nav-link", className)}
		>
			{icon}
			{children}
		</NavLink>
	);
}

export { HeaderLink };
