import clsx from "clsx";

import { useFieldGroupContext } from "./field-group.context";

type FieldLabelProps = {
	children?: React.ReactNode;
	className?: string;
	optional?: boolean;
	htmlFor?: string;
};

function FieldLabel({
	children,
	className,
	optional,
	htmlFor,
}: FieldLabelProps) {
	const groupSize = useFieldGroupContext();

	return (
		<label
			className={clsx(
				"w-fit text-gray-900 dark:text-neutral-200",
				groupSize && "text-sm",
				className,
			)}
			htmlFor={htmlFor}
		>
			{children}
			{optional && <span className="text-xs"> (Optional)</span>}
		</label>
	);
}

export { FieldLabel };
