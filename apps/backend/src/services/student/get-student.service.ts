import type { GetStudentSchema } from "@repo/schemas/students/get.student";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Student } from "@/models/student.model";
import { studentDto } from "@/utils/dtos/studentDto";

async function getStudentService({
	input,
}: AuthControllerContext<GetStudentSchema>) {
	const student = await Student.findOne({
		_id: input.params.id,
		deletedAt: null,
	})
		.lean()
		.exec();

	if (!student) throw new AppError(404, "Student could not be found");

	return response(200, studentDto(student));
}

export { getStudentService };
