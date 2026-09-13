import clsx from "clsx";
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
	return (
		<NavLink
			to={to}
			onClick={(e) => to === "void" && e.preventDefault() && onClick?.(e)}
			className={clsx("nav-link", className)}
		>
			{icon}
			{children}
		</NavLink>
	);
}

export { HeaderLink };
