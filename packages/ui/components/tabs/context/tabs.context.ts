import { createContext, useContext } from "react";

export const ActiveTabContext = createContext<null | string>(null);
export const ActiveTabDispatchContext = createContext<
	(value: string | null) => void
>(() => {});

export function useActiveTab() {
	return useContext(ActiveTabContext);
}

export function useSetActiveTab() {
	return useContext(ActiveTabDispatchContext);
}
