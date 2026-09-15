import clsx from "clsx";
import type { Ref } from "react";
import { useFieldGroupContext } from "../../field/field-group.context";
import type { Size } from "../types";

type SelectProps = Omit<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	"size"
> & {
	size?: Size;
	ref?: Ref<HTMLSelectElement>;
	isInvalid?: boolean;
	children: React.ReactNode;
};

const SIZE_VARIANTS: Record<Size, string> = {
	small: clsx("rounded-sm px-2 py-1 text-sm"),
	base: clsx("rounded-md px-3 py-1.5"),
};

function Select({ isInvalid, className, size, ...rest }: SelectProps) {
	const groupSize = useFieldGroupContext();

	return (
		<select
			className={clsx(
				"relative w-full border transition-all outline-none focus:z-1 focus:ring-4 *:dark:bg-neutral-900",
				"disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-400",
				"dark:disabled:border-neutral-700 disabled:dark:bg-neutral-700 disabled:dark:text-neutral-400",
				SIZE_VARIANTS[groupSize || size || "base"],
				isInvalid
					? "border-red focus:border-red focus:ring-red/25"
					: "border-gray-300 focus:border-primary focus:ring-primary/25 dark:border-neutral-700",
				className,
			)}
			aria-invalid={isInvalid}
			{...rest}
		/>
	);
}

export { Select };
