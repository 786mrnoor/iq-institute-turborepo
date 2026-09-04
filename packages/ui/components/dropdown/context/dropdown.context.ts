import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
} from "react";

export const DropdwonContext = createContext(false);
export const DropdwonDispatchContext = createContext<
	Dispatch<SetStateAction<boolean>>
>(() => {});

export function useDropdown() {
	return useContext(DropdwonContext);
}

export function useDropdownDispatch() {
	return useContext(DropdwonDispatchContext);
}
