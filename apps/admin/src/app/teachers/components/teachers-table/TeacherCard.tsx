import { useNavigate } from "react-router";

import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { Button, ButtonGroup } from "@repo/ui/button";
import { formatDOB } from "@repo/utils/date/format/dob.js";

type TeacherCardProps = {
	teacher: TeacherBaseSchema;
	onDelete: () => void;
	onLeft: () => void;
};

function TeacherCard({ teacher, onDelete, onLeft }: TeacherCardProps) {
	const navigate = useNavigate();

	return (
		<tr className="align-top text-sm *:border *:border-gray-300 *:p-2 odd:bg-gray-100 dark:*:border-neutral-700 dark:odd:bg-neutral-900">
			<td>
				Name: <strong>{teacher.name}</strong> <br />
				Gender: <strong>{teacher.gender}</strong> <br />
				DOB: <strong>{formatDOB(teacher.dob)}</strong> <br />
				Joining Date: <strong>{formatDOB(teacher.joinedAt)}</strong>
			</td>
			<td>
				Teacher ID: <strong>{teacher.teacherId}</strong> <br />
				Adhar No.: <strong>{teacher.adharNo}</strong> <br />
			</td>
			<td>
				Mobile No.: <strong>{teacher.mobile}</strong> <br />
				Email: <strong>{teacher.email}</strong> <br />
			</td>
			<td>{teacher.address}</td>
			<td>
				<ButtonGroup>
					<Button
						size="small"
						onClick={() => navigate(`/admin/teachers/edit/${teacher.id}`)}
						color="success"
					>
						Edit
					</Button>
					<Button size="small" color="danger" onClick={onDelete}>
						Delete
					</Button>
					<Button size="small" onClick={onLeft}>
						Left
					</Button>
				</ButtonGroup>
			</td>
		</tr>
	);
}

export { TeacherCard };
