import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { AppError } from "@repo/utils/app-error.js";
import { Course } from "@/models/course.model";

async function checkCourse(courseId: CourseBaseSchema["id"]) {
	const existingCourse = await Course.findOne({
		_id: courseId,
		deletedAt: null,
	}).select("_id");

	if (!existingCourse) {
		throw new AppError(404, "Course does not exist");
	}
}

export { checkCourse };
