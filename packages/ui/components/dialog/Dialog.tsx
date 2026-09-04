"use client";

import { type DialogHTMLAttributes, useEffect, useRef } from "react";

import { DialogProvider } from "./context/dialog.provider";

type DialogProps = {
	show: boolean;
	onClose: () => void;
	children: React.ReactNode;
	closedBy?: DialogHTMLAttributes<HTMLDialogElement>["closedby"];
};

function Dialog({
	children,
	show,
	closedBy = "closerequest",
	onClose,
}: DialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (show) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [show]);

	return (
		<DialogProvider onClose={onClose}>
			<dialog
				onClose={onClose}
				closedby={closedBy}
				ref={dialogRef}
				className="m-auto max-w-180 min-w-80 scrollbar-thin rounded-xl ring-1 ring-gray-300 duration-300 backdrop:backdrop-blur-xs starting:scale-50"
			>
				{children}
			</dialog>
		</DialogProvider>
	);
}

export { Dialog };
