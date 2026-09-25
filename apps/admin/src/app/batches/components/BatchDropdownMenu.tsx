import { useState } from "react";
import { useNavigate } from "react-router";

import type { BatchBaseSchema } from "@repo/schemas/batch/base.batch";
import { DropdownItem, DropdownMenu } from "@repo/ui/dropdown";

import { DeleteBatchModal } from "./DeleteBatchModal";

type BatchDropdownMenuProps = {
	id: BatchBaseSchema["id"];
};

function BatchDropdownMenu({ id }: BatchDropdownMenuProps) {
	const navigate = useNavigate();
	const [showDelete, setShowDelete] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownItem onClick={() => navigate(`/admin/batches/edit/${id}`)}>
					Edit
				</DropdownItem>
				<DropdownItem colorVariant="danger" onClick={() => setShowDelete(true)}>
					Delete
				</DropdownItem>
			</DropdownMenu>

			{showDelete && (
				<DeleteBatchModal id={id} onCancel={() => setShowDelete(false)} />
			)}
		</>
	);
}

export { BatchDropdownMenu };
