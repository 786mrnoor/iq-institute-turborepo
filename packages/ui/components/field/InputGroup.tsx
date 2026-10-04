import clsx from "clsx";

import type { Size } from "../form-controls/types";
import { FieldGroupContext } from "./field-group.context";

type InputGroupProps = {
	children: React.ReactNode;
	className?: string;
	size?: Size;
};

function InputGroup({ children, className, size }: InputGroupProps) {
	return (
		<FieldGroupContext value={size}>
			{/* biome-ignore lint/a11y/useSemanticElements: can not use other element*/}
			<div
				role="group"
				className={clsx(
					"isolate flex *:not-first:rounded-l-none *:not-last:rounded-r-none",
					className,
				)}
			>
				{children}
			</div>
		</FieldGroupContext>
	);
}

export { InputGroup };
