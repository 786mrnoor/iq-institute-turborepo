import { useNavigate } from "react-router";

import type { StudentBaseSchema } from "@repo/schemas/students/base.student";
import { Button, ButtonGroup } from "@repo/ui/button";
import { TableCell, TableRow } from "@repo/ui/table";
import { formatDOB } from "@repo/utils/date/format/dob.js";

type StudentCardProps = {
	student: StudentBaseSchema;
	onDelete: () => void;
};

function StudentCard({ student, onDelete }: StudentCardProps) {
	const navigate = useNavigate();

	return (
		<TableRow>
			<TableCell>
				Name: <strong>{student.name}</strong> <br />
				Gender: <strong>{student.gender}</strong> <br />
				DOB: <strong>{formatDOB(student.dob)}</strong> <br />
				Registration Date: <strong>{formatDOB(student.registeredAt)}</strong>
			</TableCell>

			<TableCell>
				Student ID: <strong>{student.studentId}</strong> <br />
				Adhar No.: <strong>{student.adharNo}</strong> <br />
				Apaar ID: <strong>{student.apaarId}</strong> <br />
			</TableCell>

			<TableCell>
				Father&apos;s Name: <strong>{student.fatherName}</strong> <br />
				Mother&apos;s Name: <strong>{student.motherName}</strong> <br />
			</TableCell>

			<TableCell>
				Mobile No.: <strong>{student.mobile}</strong> <br />
				Email: <strong>{student.email}</strong> <br />
			</TableCell>

			<TableCell>{student.address}</TableCell>

			<TableCell>
				<ButtonGroup>
					<Button
						size="small"
						onClick={() => navigate(`/admin/students/edit/${student.id}`)}
					>
						Edit
					</Button>
					<Button size="small" color="danger" onClick={onDelete}>
						Delete
					</Button>
				</ButtonGroup>
			</TableCell>
		</TableRow>
	);
}

export { StudentCard };
