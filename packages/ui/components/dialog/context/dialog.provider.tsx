"use client";

import { DialogCloseContext } from "./dialog.context";

type DialogProviderProps = { children: React.ReactNode; onClose: () => void };

function DialogProvider({ children, onClose }: DialogProviderProps) {
	return <DialogCloseContext value={onClose}>{children}</DialogCloseContext>;
}

export { DialogProvider };
