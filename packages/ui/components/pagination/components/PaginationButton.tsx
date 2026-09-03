import clsx from "clsx";

type PaginationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function PaginationButton({
	children,
	className,
	...rest
}: PaginationButtonProps) {
	return (
		<button
			className={clsx(
				"relative -ml-px inline-block border border-gray-300 px-3 py-1.5 text-primary outline-none",
				"cursor-pointer disabled:cursor-auto disabled:bg-gray-200 disabled:text-gray-400",
				"focus-visible:z-1 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/30",
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	);
}

export { PaginationButton };
