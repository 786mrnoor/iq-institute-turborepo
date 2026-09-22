import { createContext, useContext } from "react";

import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";

export const EditContext = createContext<null | TopicBaseSchema["id"]>(null);
export const SetEditContext = createContext<
	React.Dispatch<React.SetStateAction<TopicBaseSchema["id"] | null>>
>(() => null);

export function useEditId() {
	return useContext(EditContext);
}

export function useSetEditId() {
	return useContext(SetEditContext);
}
