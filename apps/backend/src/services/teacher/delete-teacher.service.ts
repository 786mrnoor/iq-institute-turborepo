import type { DeleteTeacherSchema } from "@repo/schemas/teachers/delete.teacher";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Teacher } from "@/models/teacher.model";

async function deleteTeacherService({
	input,
}: AuthControllerContext<DeleteTeacherSchema>) {
	const id = input.params.id;

	const result = await Teacher.updateOne(
		{ _id: id },
		{ deletedAt: new Date() },
	).exec();

	if (result.modifiedCount === 1) {
		return response(204, null);
	}

	throw new AppError(400, "Teacher could not be deleted successfully");
}

export { deleteTeacherService };
