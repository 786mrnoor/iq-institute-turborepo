import { clsx } from "clsx";

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
	return (
		<td
			className={clsx(
				"p-2 border border-gray-300 dark:border-neutral-700",
				className,
			)}
			{...props}
		/>
	);
}

export { TableCell };
