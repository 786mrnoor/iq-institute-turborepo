import { useNavigate } from "react-router";

import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { Button, ButtonGroup } from "@repo/ui/button";
import { TableCell, TableRow } from "@repo/ui/table";
import { formatDOB } from "@repo/utils/date/format/dob.js";

type TeacherCardProps = {
	teacher: TeacherBaseSchema;
	onDelete: () => void;
	onLeft: () => void;
	onActive: () => void;
};

function TeacherCard({
	teacher,
	onDelete,
	onLeft,
	onActive,
}: TeacherCardProps) {
	const navigate = useNavigate();

	return (
		<TableRow>
			<TableCell>
				Name: <strong>{teacher.name}</strong> <br />
				Gender: <strong>{teacher.gender}</strong> <br />
				DOB: <strong>{formatDOB(teacher.dob)}</strong> <br />
				Joining Date: <strong>{formatDOB(teacher.joinedAt)}</strong>
			</TableCell>
			<TableCell>
				Teacher ID: <strong>{teacher.teacherId}</strong> <br />
				Adhar No.: <strong>{teacher.adharNo}</strong> <br />
			</TableCell>
			<TableCell>
				Mobile No.: <strong>{teacher.mobile}</strong> <br />
				Email: <strong>{teacher.email}</strong> <br />
			</TableCell>
			<TableCell>{teacher.address}</TableCell>
			<TableCell>
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

					{teacher.leftAt ? (
						<Button size="small" onClick={onActive}>
							Active
						</Button>
					) : (
						<Button size="small" onClick={onLeft}>
							Left
						</Button>
					)}
				</ButtonGroup>
			</TableCell>
		</TableRow>
	);
}

export { TeacherCard };
