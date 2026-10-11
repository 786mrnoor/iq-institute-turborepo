import { useState } from "react";

import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/table";

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
		<Table className="overflow-auto bg-white mb-3 dark:bg-neutral-800">
			<TableHeader className="bg-black text-white">
				<TableRow className="*:border *:border-gray-300 *:p-2 dark:*:border-neutral-700">
					<TableHead>Basic Details</TableHead>
					<TableHead>IDs</TableHead>
					<TableHead>Contact Details</TableHead>
					<TableHead>Address</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{teachers?.map((teacher) => (
					<TeacherCard
						key={teacher.id}
						teacher={teacher}
						onLeft={() => setState({ teacherId: teacher.id, type: "left" })}
						onActive={() => setState({ teacherId: teacher.id, type: "active" })}
						onDelete={() => setState({ teacherId: teacher.id, type: "delete" })}
					/>
				))}
			</TableBody>
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
		</Table>
	);
}

export { TeachersTable };
