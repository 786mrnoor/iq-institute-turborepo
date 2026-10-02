import { useState } from "react";

import type { StudentBaseSchema } from "@repo/schemas/students/base.student";

import { DeleteStudentModal } from "./DeleteUserModal";
import { StudentCard } from "./StudentCard";

type StudentsTableProps = {
	students: StudentBaseSchema[];
};

function StudentsTable({ students }: StudentsTableProps) {
	const [deleteId, setDeleteId] = useState<StudentBaseSchema["id"] | null>(
		null,
	);

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
						<th>Parents Details</th>
						<th>Contact Details</th>
						<th>Address</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{students?.map((student) => (
						<StudentCard
							key={student.id}
							student={student}
							onDelete={() => setDeleteId(student.id)}
						/>
					))}
				</tbody>
			</table>
			{deleteId && (
				<DeleteStudentModal id={deleteId} onCancel={() => setDeleteId(null)} />
			)}
		</div>
	);
}

export { StudentsTable };
