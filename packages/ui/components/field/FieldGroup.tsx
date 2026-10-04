import clsx from "clsx";
import type React from "react";

import type { Size } from "../form-controls/types";
import { FieldGroupContext } from "./field-group.context";

type FieldGroupProps = {
	children?: React.ReactNode;
	orientation?: "horizontal" | "vertical";
	size?: Size;
	className?: string;
};

function FieldGroup({
	children,
	orientation = "vertical",
	size,
	className,
}: FieldGroupProps) {
	return (
		<FieldGroupContext value={size}>
			{/* biome-ignore lint/a11y/useSemanticElements: can not use other element*/}
			<div
				role="group"
				data-orientation={orientation}
				className={clsx(
					"isolate flex w-full",
					orientation === "vertical"
						? "flex-col gap-1.5"
						: "flex-row items-center gap-2",
					className,
				)}
			>
				{children}
			</div>
		</FieldGroupContext>
	);
}

export { FieldGroup };
