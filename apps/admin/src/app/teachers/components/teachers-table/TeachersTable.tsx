import { useState } from "react";

import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";

import { ActiveTeacherModal } from "./ActiveTeacherModal";
import { DeleteTeacherModal } from "./DeleteTeacherModal";
import { LeftTeacherModal } from "./LeftTeacherModal";
import { TeacherCard } from "./TeacherCard";

type TeachersTableProps = {
	teachers: TeacherBaseSchema[];
};

type ActionState = {
	teacherId: TeacherBaseSchema["id"];
	type: "delete" | "left" | "active";
};

function TeachersTable({ teachers }: TeachersTableProps) {
	const [state, setState] = useState<ActionState | null>(null);

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
							onLeft={() => setState({ teacherId: teacher.id, type: "left" })}
							onActive={() =>
								setState({ teacherId: teacher.id, type: "active" })
							}
							onDelete={() =>
								setState({ teacherId: teacher.id, type: "delete" })
							}
						/>
					))}
				</tbody>
			</table>
			{state?.type === "delete" && (
				<DeleteTeacherModal
					id={state.teacherId}
					onCancel={() => setState(null)}
				/>
			)}
			{state?.type === "left" && (
				<LeftTeacherModal id={state.teacherId} onClose={() => setState(null)} />
			)}
			{state?.type === "active" && (
				<ActiveTeacherModal
					id={state.teacherId}
					onClose={() => setState(null)}
				/>
			)}
		</div>
	);
}

export { TeachersTable };
