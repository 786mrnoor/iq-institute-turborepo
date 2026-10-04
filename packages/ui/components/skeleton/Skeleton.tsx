import clsx from "clsx";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={clsx(
				"animate-pulse rounded-md bg-gray-400 dark:bg-neutral-800",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
