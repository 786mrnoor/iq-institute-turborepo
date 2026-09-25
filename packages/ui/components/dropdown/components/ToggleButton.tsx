import type React from "react";

import { useDropdownDispatch } from "../context/dropdown.context";

type ToggleButtonProps = {
	children: React.ReactNode;
	className?: string;
};

function DropdownToggleButton({ children, className }: ToggleButtonProps) {
	const setShow = useDropdownDispatch();

	return (
		<button
			type="button"
			onClick={() => setShow((s) => !s)}
			className={`cursor-pointer border-none p-0 outline-none ${className}`}
		>
			{children}
		</button>
	);
}

export { DropdownToggleButton };
