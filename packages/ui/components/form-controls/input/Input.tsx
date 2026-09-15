import clsx from "clsx";
import type { Ref } from "react";
import { useFieldGroupContext } from "../../field/field-group.context";
import type { Size } from "../types";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
	size?: Size;
	ref?: Ref<HTMLInputElement>;
	isInvalid?: boolean;
};

function Input({ isInvalid, className, size = "base", ...rest }: InputProps) {
	const groupSize = useFieldGroupContext();

	return (
		<input
			aria-invalid={isInvalid}
			className={clsx(
				"form-control",
				groupSize || size,
				isInvalid && "invalid",
				className,
			)}
			{...rest}
		/>
	);
}

export { Input };
