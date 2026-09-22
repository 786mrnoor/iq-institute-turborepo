import { useState } from "react";
import { useNavigate } from "react-router";

import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { DropdownItem, DropdownMenu } from "@repo/ui/dropdown";

import { DeleteCourseModal } from "./DeleteCourseModal";

type CourseDropdownMenuProps = {
	id: CourseBaseSchema["id"];
};

function CourseDropdownMenu({ id }: CourseDropdownMenuProps) {
	const navigate = useNavigate();
	const [showDelete, setShowDelete] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownItem onClick={() => navigate(`/admin/courses/edit/${id}`)}>
					Edit
				</DropdownItem>
				<DropdownItem colorVariant="danger" onClick={() => setShowDelete(true)}>
					Delete
				</DropdownItem>
			</DropdownMenu>

			{showDelete && (
				<DeleteCourseModal id={id} onCancel={() => setShowDelete(false)} />
			)}
		</>
	);
}

export { CourseDropdownMenu };
