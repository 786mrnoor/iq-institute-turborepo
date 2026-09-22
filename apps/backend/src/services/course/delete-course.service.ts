import type { DeleteCourseSchema } from "@repo/schemas/course/delete.course";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Course } from "@/models/course.model";

async function deleteCourseService({
	input,
}: AuthControllerContext<DeleteCourseSchema>) {
	const id = input.params.id;
	const result = await Course.updateOne(
		{ _id: id, deletedAt: null },
		{ deletedAt: new Date() },
	).exec();

	if (result.modifiedCount === 1) {
		return response(204, null);
	}

	throw new AppError(404, "Course not found");
}

export { deleteCourseService };
