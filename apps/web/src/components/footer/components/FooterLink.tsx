import clsx from "clsx";

import { AppLink } from "@/components/link/AppLink";
import type { WebAppRoutes } from "@/types/routes";

type FooterLinkProps = {
	children?: React.ReactNode;
	href: WebAppRoutes;
	className?: string;
};

export function FooterLink({ children, href, className }: FooterLinkProps) {
	return (
		<AppLink
			href={href}
			className={clsx(
				"p-2 whitespace-nowrap underline decoration-dotted underline-offset-8",
				className,
			)}
		>
			{children}
		</AppLink>
	);
}
