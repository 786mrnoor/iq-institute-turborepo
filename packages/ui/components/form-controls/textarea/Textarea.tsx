import clsx from "clsx";
import type { ChangeEvent, Ref } from "react";

import { useFieldGroupContext } from "../../field/field-group.context";
import type { Size } from "../types";

type TextareaProps = Omit<
	React.InputHTMLAttributes<HTMLTextAreaElement>,
	"size"
> & {
	size?: Size;
	ref?: Ref<HTMLTextAreaElement>;
	isInvalid?: boolean;
	autoHeight?: boolean;
};

function Textarea({
	isInvalid,
	className,
	onChange,
	autoHeight,
	size = "base",
	...rest
}: TextareaProps) {
	const groupSize = useFieldGroupContext();

	function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		onChange?.(e);

		if (autoHeight) {
			e.target.style.height = "auto";
			e.target.style.height = `${e.target.scrollHeight + 2}px`;
		}
	}

	return (
		<textarea
			{...rest}
			aria-invalid={isInvalid}
			onChange={handleChange}
			className={clsx(
				"form-control resize-none",
				groupSize || size,
				isInvalid && "invalid",
				className,
			)}
		></textarea>
	);
}

export { Textarea };
