import clsx from "clsx";

type HeadingProps = { children: React.ReactNode; className?: string };

function Heading({ children, className }: HeadingProps) {
	return (
		<h1
			className={clsx(
				"mx-auto w-fit border-b-2 border-gray-300 px-5 pb-3 text-center text-3xl font-bold text-primary dark:border-neutral-700",
				className,
			)}
		>
			{children}
		</h1>
	);
}

export { Heading };
