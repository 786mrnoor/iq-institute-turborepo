import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";

import type { TTeacher } from "@/models/teacher.model";

export function teacherDto(doc: TTeacher) {
	const { _id, __v, ...rest } = doc;

	return {
		...rest,
		id: String(_id),
	} as TeacherBaseSchema;
}
