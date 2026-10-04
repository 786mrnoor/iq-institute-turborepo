import clsx from "clsx";

type ButtonGroupProps = {
	children: React.ReactNode;
	className?: string;
};

function ButtonGroup({ children, className }: ButtonGroupProps) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: not needed
		<div
			role="group"
			className={clsx(
				"isolate flex *:not-first:rounded-l-none *:not-last:rounded-r-none",
				className,
			)}
		>
			{children}
		</div>
	);
}

export { ButtonGroup };
