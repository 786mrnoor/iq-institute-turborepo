import { useState } from "react";

import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";

import { EditContext, SetEditContext } from "./EditContext";

type EditProviderProps = {
	children: React.ReactNode;
};

function EditProvider({ children }: EditProviderProps) {
	const [edit, setEdit] = useState<null | TopicBaseSchema["id"]>(null);
	return (
		<EditContext value={edit}>
			<SetEditContext value={setEdit}>{children}</SetEditContext>
		</EditContext>
	);
}

export { EditProvider };
