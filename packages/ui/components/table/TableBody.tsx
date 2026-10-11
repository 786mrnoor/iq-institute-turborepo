import clsx from "clsx";

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody
			className={clsx("*:odd:bg-gray-100 *:dark:odd:bg-neutral-900", className)}
			{...props}
		/>
	);
}

export { TableBody };
