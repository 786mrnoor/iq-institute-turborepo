import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { AppError } from "@repo/utils/app-error.js";

import { Teacher } from "@/models/teacher.model";

async function checkTeacher(teacherId: TeacherBaseSchema["id"]) {
	const existingTeacher = await Teacher.findOne({
		_id: teacherId,
		deletedAt: null,
	})
		.select("_id leftAt")
		.lean()
		.exec();

	if (!existingTeacher) {
		throw new AppError(404, "Teacher does not exist");
	}

	return {
		id: existingTeacher._id,
		leftAt: existingTeacher.leftAt,
	};
}

export { checkTeacher };
