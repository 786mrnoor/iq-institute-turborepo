import clsx from "clsx";
import { useFieldGroupContext } from "../../field/field-group.context";
import type { Size } from "../types";

type CheckableProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"size" | "type"
> & {
	type: "radio" | "checkbox";
	size?: Size;
	isInvalid?: boolean;
	children: React.ReactNode;
};

const SIZE_VARIANTS: Record<Size, string> = {
	small: clsx("rounded-sm px-2 py-1 text-sm"),
	base: clsx("rounded-md px-3 py-1.5"),
};

function Checkable({
	children,
	type,
	isInvalid,
	className,
	size,
	...rest
}: CheckableProps) {
	const groupSize = useFieldGroupContext();

	return (
		<label
			className={clsx(
				"relative flex w-full items-center gap-2 border transition-all",
				"disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-400",
				"dark:disabled:border-neutral-700 disabled:dark:bg-neutral-700 disabled:dark:text-neutral-400",
				"cursor-pointer outline-none focus-within:z-1 focus-within:ring-4",
				SIZE_VARIANTS[groupSize || size || "base"],
				isInvalid
					? "border-red focus-within:border-red focus-within:ring-red/25"
					: "border-gray-300 focus-within:border-primary focus-within:ring-primary/25 has-checked:border-primary dark:border-neutral-700",
				className,
			)}
		>
			<input
				aria-invalid={isInvalid}
				type={type}
				className="mt-1 outline-0"
				{...rest}
			/>
			<span>{children}</span>
		</label>
	);
}

export { Checkable };
