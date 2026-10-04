import clsx from "clsx";
import type React from "react";

type TabsListProps = {
	children: React.ReactNode;
	className?: string;
};

function TabsList({ children, className }: TabsListProps) {
	return (
		<div
			className={clsx(
				"bg-white p-1 rounded-lg flex flex-wrap gap-2 w-fit shadow dark:bg-neutral-800",
				className,
			)}
		>
			{children}
		</div>
	);
}

export { TabsList };
