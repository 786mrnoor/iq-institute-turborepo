import { useSuspenseQuery } from "@tanstack/react-query";

import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";

import { teacherQueries } from "@/queries/teacher";

type TeacherDetailsProps = {
	id: TeacherBaseSchema["id"];
};
function TeacherDetails({ id }: TeacherDetailsProps) {
	const { data: teacher } = useSuspenseQuery(teacherQueries.detail(id));

	return (
		<p>
			<strong>Teacher: </strong>
			{teacher.name}
		</p>
	);
}

export { TeacherDetails };
