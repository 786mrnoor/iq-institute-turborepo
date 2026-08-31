import type { MouseEventHandler } from "react";

import Bar from "./Bar";

type BarsProps = {
	active: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
	className?: string;
};

function Bars({ active, onClick, className }: BarsProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={
				"flex h-7 w-8.75 cursor-pointer flex-col justify-between border-none outline-transparent md:hidden " +
				className
			}
		>
			<Bar className={active ? "origin-top-left rotate-45" : ""}></Bar>
			<Bar className={active ? "scale-y-0" : ""}></Bar>
			<Bar className={active ? "origin-bottom-left -rotate-45" : ""}></Bar>
		</button>
	);
}

export default Bars;
