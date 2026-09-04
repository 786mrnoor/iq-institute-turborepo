import type React from "react";

import { useDropdownDispatch } from "../context/dropdown.context";

type ToggleButtonProps = {
	children: React.ReactNode;
	className?: string;
};

function DropdownToggleButton({ children }: ToggleButtonProps) {
	const setShow = useDropdownDispatch();

	function toggle(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		setShow((s) => !s);
	}

	return (
		<button
			type="button"
			onClick={toggle}
			className="cursor-pointer border-none p-0 outline-none"
		>
			{children}
		</button>
	);
}

export { DropdownToggleButton };
