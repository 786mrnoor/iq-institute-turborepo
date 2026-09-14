import clsx from "clsx";

import type { ButtonProps, Color, Size } from "./types";

const COLOR_VARIANTS: Record<Color, string> = {
	primary: clsx(
		"border-primary bg-primary text-white focus-visible:ring-primary/25",
	),
	danger: clsx("border-red bg-red text-white focus-visible:ring-red/25"),
	success: clsx("border-green bg-green text-white focus-visible:ring-green/25"),
};

const SIZE_VARIANTS: Record<Size, string> = {
	small: clsx("rounded-sm px-2 py-1 text-sm"),
	base: clsx("rounded-md px-3 py-1.5"),
};

function Button({
	color = "primary",
	size = "base",
	children,
	className,
	...props
}: ButtonProps) {
	const classes = clsx(
		"relative inline-block cursor-pointer border transition-all outline-none focus-visible:z-1 focus-visible:ring-4",
		"disabled:cursor-auto disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-400",
		"dark:disabled:border-neutral-700 disabled:dark:bg-neutral-700 disabled:dark:text-neutral-400",
		COLOR_VARIANTS[color],
		SIZE_VARIANTS[size],
		className,
	);

	return (
		<button {...props} className={classes}>
			{children}
		</button>
	);
}

export { Button };
