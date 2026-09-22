import type { DeleteStudentSchema } from "@repo/schemas/students/delete.student";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Student } from "@/models/student.model";

async function deleteStudentService({
	input,
}: AuthControllerContext<DeleteStudentSchema>) {
	const id = input.params.id;

	const result = await Student.updateOne(
		{ _id: id },
		{ deletedAt: new Date() },
	).exec();

	if (result.modifiedCount === 1) {
		return response(204, null);
	}

	throw new AppError(400, "Student could not be deleted successfully");
}

export { deleteStudentService };
