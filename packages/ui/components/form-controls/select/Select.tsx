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

function Select({ isInvalid, className, size = "base", ...rest }: SelectProps) {
	const groupSize = useFieldGroupContext();

	return (
		<select
			aria-invalid={isInvalid}
			className={clsx(
				"form-control",
				"*:dark:bg-neutral-900",
				groupSize || size,
				isInvalid && "invalid",
				className,
			)}
			{...rest}
		/>
	);
}

export { Select };
