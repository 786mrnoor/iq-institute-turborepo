import { useState } from "react";

import type { StudentBaseSchema } from "@repo/schemas/students/base.student";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/table";

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
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Basic Details</TableHead>
					<TableHead>IDs</TableHead>
					<TableHead>Parents Details</TableHead>
					<TableHead>Contact Details</TableHead>
					<TableHead>Address</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{students?.map((student) => (
					<StudentCard
						key={student.id}
						student={student}
						onDelete={() => setDeleteId(student.id)}
					/>
				))}
			</TableBody>
			{deleteId && (
				<DeleteStudentModal id={deleteId} onCancel={() => setDeleteId(null)} />
			)}
		</Table>
	);
}

export { StudentsTable };
