import { useState } from "react";

import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";
import { DropdownItem, DropdownMenu } from "@repo/ui/dropdown";

import { useSetEditId } from "../context/EditContext";
import { DeleteTopicModal } from "./DeleteTopicModal";

type TopicDropdownMenu = {
	id: TopicBaseSchema["id"];
};

function TopicDropdownMenu({ id }: TopicDropdownMenu) {
	const setEditId = useSetEditId();
	const [showDelete, setShowDelete] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownItem onClick={() => setEditId(id)}>Edit</DropdownItem>
				<DropdownItem colorVariant="danger" onClick={() => setShowDelete(true)}>
					Delete
				</DropdownItem>
			</DropdownMenu>
			{showDelete && (
				<DeleteTopicModal id={id} onCancel={() => setShowDelete(false)} />
			)}
		</>
	);
}

export { TopicDropdownMenu };
