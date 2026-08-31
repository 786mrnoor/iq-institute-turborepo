type HeadingProps = { children: React.ReactNode };

function Heading({ children }: HeadingProps) {
	return (
		<h2 className="my-10 text-center text-3xl font-bold text-primary-dark">
			{children}
		</h2>
	);
}

export { Heading };
