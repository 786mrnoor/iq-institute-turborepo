import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";
import { DropdownItem, DropdownMenu } from "@repo/ui/dropdown";
import { useSetEditId } from "../context/EditContext";

type TopicDropdownMenu = {
	id: TopicBaseSchema["id"];
};

function TopicDropdownMenu({ id }: TopicDropdownMenu) {
	const setEditId = useSetEditId();

	return (
		<DropdownMenu>
			<DropdownItem onClick={() => setEditId(id)}>Edit</DropdownItem>
			<DropdownItem colorVariant="danger">Delete</DropdownItem>
		</DropdownMenu>
	);
}

export { TopicDropdownMenu };
