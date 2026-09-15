import type { StudentBaseSchema } from "@repo/schemas/students/base.student";
import { Button, ButtonGroup } from "@repo/ui/button";
import { formatDateTime } from "@repo/utils/date/format/date-time.js";
import { formatDOB } from "@repo/utils/date/format/dob.js";
import { useNavigate } from "react-router";

type StudentCardProps = {
	student: StudentBaseSchema;
	onDelete: () => void;
};

function StudentCard({ student, onDelete }: StudentCardProps) {
	const navigate = useNavigate();

	return (
		<tr className="align-top text-sm *:border *:border-gray-300 *:p-2 odd:bg-gray-100 dark:*:border-neutral-700 dark:odd:bg-neutral-900">
			<td>
				Name: <strong>{student.name}</strong> <br />
				Gender: <strong>{student.gender}</strong> <br />
				DOB: <strong>{formatDOB(student.dob)}</strong> <br />
				Added At: <strong>{formatDateTime(student.createdAt)}</strong>
			</td>
			<td>
				Adhar No.: <strong>{student.adharNo}</strong> <br />
				Apaar Id: <strong>{student.apaarId}</strong> <br />
			</td>
			<td>
				Father&apos;s Name: <strong>{student.fatherName}</strong> <br />
				Mother&apos;s Name: <strong>{student.motherName}</strong> <br />
			</td>
			<td>
				Mobile No.: <strong>{student.mobile}</strong> <br />
				Email: <strong>{student.email}</strong> <br />
			</td>
			<td>{student.address}</td>
			<td>
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
			</td>
		</tr>
	);
}

export { StudentCard };
