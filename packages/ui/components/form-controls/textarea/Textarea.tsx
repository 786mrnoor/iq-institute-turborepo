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

const SIZE_VARIANTS: Record<Size, string> = {
	small: clsx("rounded-sm px-2 py-1 text-sm"),
	base: clsx("rounded-md px-3 py-1.5"),
};

function Textarea({
	isInvalid,
	className,
	onChange,
	autoHeight,
	size,
	...rest
}: TextareaProps) {
	const groupSize = useFieldGroupContext();

	function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		onChange?.(e);

		if (autoHeight) {
			e.target.style.height = "auto";
			e.target.style.height = e.target.scrollHeight + 2 + "px";
		}
	}

	return (
		<textarea
			{...rest}
			onChange={handleChange}
			className={clsx(
				"relative w-full resize-none border text-foreground transition-all outline-none focus:z-1 focus:ring-4",
				"disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-400",
				SIZE_VARIANTS[groupSize || size || "base"],
				isInvalid
					? "border-red focus:border-red focus:ring-red/25"
					: "border-gray-300 focus:border-primary focus:ring-primary/25",
				className,
			)}
			aria-invalid={isInvalid}
		></textarea>
	);
}

export { Textarea };
