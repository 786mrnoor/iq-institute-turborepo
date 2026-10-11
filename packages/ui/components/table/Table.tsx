import { clsx } from "clsx";

function Table({ className, ...props }: React.ComponentProps<"table">) {
	return (
		<div
			data-slot="table-container"
			className="overflow-auto bg-white mb-3 dark:bg-neutral-800"
		>
			<table
				className={clsx(
					"w-full border border-gray-300 dark:border-neutral-700",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

export { Table };
