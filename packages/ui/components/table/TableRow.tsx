import { clsx } from "clsx";

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return <tr className={clsx("align-top text-sm", className)} {...props} />;
}

export { TableRow };
