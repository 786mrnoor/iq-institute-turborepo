import clsx from "clsx";
import type React from "react";

import { useDropdownDispatch } from "../context/dropdown.context";

const ColorVariant = {
	primary: "bg-white text-foreground",
	danger: "bg-white text-red",
} as const;

type DropdownItemProps = {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	colorVariant?: keyof typeof ColorVariant;
};

function DropdownItem({
	children,
	onClick,
	colorVariant = "primary",
}: DropdownItemProps) {
	const setShow = useDropdownDispatch();

	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		setShow(false);
		if (onClick) onClick(e);
	}

	return (
		<li>
			<button
				type="button"
				className={clsx(
					"clear-both block w-full cursor-pointer border-0 px-4 py-1 text-left whitespace-nowrap hover:bg-gray-300",
					ColorVariant[colorVariant],
				)}
				onClick={handleClick}
			>
				{children}
			</button>
		</li>
	);
}

export { DropdownItem };
