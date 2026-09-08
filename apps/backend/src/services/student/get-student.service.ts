import type { GetStudentSchema } from "@repo/schemas/students/get.student";
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

	return response(200, student ? studentDto(student) : null);
}

export { getStudentService };
