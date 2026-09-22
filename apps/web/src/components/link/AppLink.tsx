import Link from "next/link";

import type { WebAppRoutes } from "@/types/routes";

type AppLinkProps = {
	href: WebAppRoutes;
	children: React.ReactNode;
	className?: string;
};

function AppLink({ href, children, className }: AppLinkProps) {
	return (
		<Link href={href} className={className} prefetch={false}>
			{children}
		</Link>
	);
}

export { AppLink };
