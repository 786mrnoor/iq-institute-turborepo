import clsx from "clsx";
import type React from "react";
import { useEffect } from "react";

import { useDropdown, useDropdownDispatch } from "../context/dropdown.context";

type DropdownMenuProps = {
	children: React.ReactNode;
	side?: "top" | "bottom";
};

function DropdownMenu({ children, side = "bottom" }: DropdownMenuProps) {
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
			className={clsx(
				"absolute right-0 z-10 min-w-40 list-none rounded-sm  py-2 border border-gray-300 bg-white dark:bg-neutral-800 dark:border-neutral-700",
				side === "top" ? "bottom-full" : "top-0",
			)}
			onClick={(e) => e.stopPropagation()}
			onKeyDown={() => {}}
		>
			{children}
		</ul>
	);
}

export { DropdownMenu };
