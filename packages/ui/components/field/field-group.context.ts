import { createContext, useContext } from "react";

import type { Size } from "../form-controls/types";

export const FieldGroupContext = createContext<Size | undefined>(undefined);

export function useFieldGroupContext() {
	return useContext(FieldGroupContext);
}
