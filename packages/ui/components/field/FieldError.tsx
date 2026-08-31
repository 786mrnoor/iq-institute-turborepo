type FieldErrorProps = {
	children: React.ReactNode;
	className?: string;
};

function FieldError({ children, className }: FieldErrorProps) {
	if (!children) return null;

	return (
		<div role="alert" className={`text-sm text-red ${className || ""}`}>
			{children}
		</div>
	);
}

export { FieldError };
