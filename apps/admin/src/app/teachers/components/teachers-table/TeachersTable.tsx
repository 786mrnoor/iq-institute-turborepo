import { useState } from "react";

import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";

import { DeleteTeacherModal } from "./DeleteTeacherModal";
import { LeftTeacherModal } from "./LeftTeacherModal";
import { TeacherCard } from "./TeacherCard";

type TeachersTableProps = {
	teachers: TeacherBaseSchema[];
};

function TeachersTable({ teachers }: TeachersTableProps) {
	const [deleteId, setDeleteId] = useState<TeacherBaseSchema["id"] | null>(
		null,
	);
	const [leftId, setLeftId] = useState<TeacherBaseSchema["id"] | null>(null);

	return (
		<div className="overflow-auto bg-white mb-3 dark:bg-neutral-800">
			<table
				border={1}
				className="mb-4 w-full border border-gray-300 dark:border-neutral-700"
			>
				<thead className="bg-black text-white">
					<tr className="*:border *:border-gray-300 *:p-2 dark:*:border-neutral-700">
						<th>Basic Details</th>
						<th>IDs</th>
						<th>Contact Details</th>
						<th>Address</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{teachers?.map((teacher) => (
						<TeacherCard
							key={teacher.id}
							teacher={teacher}
							onDelete={() => setDeleteId(teacher.id)}
							onLeft={() => setLeftId(teacher.id)}
						/>
					))}
				</tbody>
			</table>
			{deleteId && (
				<DeleteTeacherModal id={deleteId} onCancel={() => setDeleteId(null)} />
			)}
			{leftId && (
				<LeftTeacherModal id={leftId} onClose={() => setLeftId(null)} />
			)}
		</div>
	);
}

export { TeachersTable };
