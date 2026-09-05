import type { GetCourseSchema } from "@repo/schemas/course/get.course";
import { AppError } from "@repo/utils/app-error.js";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Course } from "@/models/course.model";
import { courseDto } from "@/utils/dtos/courseDto";

async function getCourseService({
	input,
}: AuthControllerContext<GetCourseSchema>) {
	const course = await Course.findOne({ _id: input.params.id, deletedAt: null })
		.lean()
		.exec();

	if (course) {
		return response(200, courseDto(course));
	}

	throw new AppError(404, "Course Not Found");
}

export { getCourseService };
