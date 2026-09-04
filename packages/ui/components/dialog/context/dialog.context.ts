import { createContext, useContext } from "react";

export const DialogCloseContext = createContext<(() => void) | undefined>(
	undefined,
);

export function useDialogClose() {
	const onClose = useContext(DialogCloseContext);
	if (onClose === undefined) {
		throw new Error("useDialogClose must be used within a DialogProvider");
	}
	return onClose;
}
