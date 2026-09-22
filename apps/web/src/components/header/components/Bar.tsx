type BarProps = {
	className?: string;
};

function Bar({ className }: BarProps) {
	return (
		<div
			className={
				"h-1 w-full bg-white transition-transform duration-300 ease-linear " +
				className
			}
		></div>
	);
}

export default Bar;
