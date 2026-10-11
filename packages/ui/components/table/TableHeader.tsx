import { clsx } from "clsx";

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead className={clsx("bg-black text-white", className)} {...props} />
	);
}

export { TableHeader };
