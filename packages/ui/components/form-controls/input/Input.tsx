import clsx from "clsx";
import type { Ref } from "react";
import { useFieldGroupContext } from "../../field/field-group.context";
import type { Size } from "../types";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
	size?: Size;
	ref?: Ref<HTMLInputElement>;
	isInvalid?: boolean;
};

const SIZE_VARIANTS: Record<Size, string> = {
	small: clsx("rounded-sm px-2 py-1 text-sm"),
	base: clsx("rounded-md px-3 py-1.5"),
};

function Input({ isInvalid, className, size, ...rest }: InputProps) {
	const groupSize = useFieldGroupContext();

	return (
		<input
			className={clsx(
				"relative w-full border text-foreground transition-all outline-none focus:z-1 focus:ring-4",
				"disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-400",
				SIZE_VARIANTS[groupSize || size || "base"],
				isInvalid
					? "border-red focus:border-red focus:ring-red/25"
					: "border-gray-300 focus:border-primary focus:ring-primary/25",
				className,
			)}
			aria-invalid={isInvalid}
			{...rest}
		/>
	);
}

export { Input };
