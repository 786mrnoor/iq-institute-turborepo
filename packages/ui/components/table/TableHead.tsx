import clsx from "clsx";

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
	return (
		<th
			className={clsx(
				"p-2 border border-gray-300 dark:border-neutral-700",
				className,
			)}
			{...props}
		/>
	);
}

export { TableHead };
