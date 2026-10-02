import type { GetTeacherSchema } from "@repo/schemas/teachers/get.teacher";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Teacher } from "@/models/teacher.model";
import { teacherDto } from "@/utils/dtos/teacherDto";

async function getTeacherService({
	input,
}: AuthControllerContext<GetTeacherSchema>) {
	const teacher = await Teacher.findOne({
		_id: input.params.id,
		deletedAt: null,
	})
		.lean()
		.exec();

	if (!teacher) throw new AppError(404, "Teacher could not be found");

	return response(200, teacherDto(teacher));
}

export { getTeacherService };
