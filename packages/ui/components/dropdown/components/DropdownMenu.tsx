import type React from "react";
import { useEffect } from "react";

import { useDropdown, useDropdownDispatch } from "../context/dropdown.context";

function DropdownMenu({ children }: { children: React.ReactNode }) {
	const show = useDropdown();
	const setShow = useDropdownDispatch();

	useEffect(() => {
		if (!show) return;

		function hideDropdown() {
			setShow(false);
		}

		document.addEventListener("click", hideDropdown);

		return () => {
			document.removeEventListener("click", hideDropdown);
		};
	}, [show, setShow]);

	if (!show) return null;
	return (
		<ul
			className="absolute right-0 z-10 min-w-40 list-none rounded-sm border border-gray-300 bg-white py-2"
			onClick={(e) => e.stopPropagation()}
			onKeyDown={() => {}}
		>
			{children}
		</ul>
	);
}

export { DropdownMenu };
