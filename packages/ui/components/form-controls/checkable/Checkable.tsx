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

function Checkable({
	children,
	type,
	isInvalid,
	className,
	size = "base",
	...rest
}: CheckableProps) {
	const groupSize = useFieldGroupContext();

	return (
		<label
			className={clsx(
				"form-control flex items-center gap-2 has-checked:border-primary cursor-pointer",
				groupSize || size,
				isInvalid && "invalid",
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
