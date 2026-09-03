import { Link } from "react-router";
import type { AdminAppRoutes } from "@/types/routes";

type AppLinkProps = {
	to: AdminAppRoutes;
	children: React.ReactNode;
	className?: string;
};

function AppLink({ to, children, className }: AppLinkProps) {
	return (
		<Link to={to} className={className}>
			{children}
		</Link>
	);
}

export { AppLink };
