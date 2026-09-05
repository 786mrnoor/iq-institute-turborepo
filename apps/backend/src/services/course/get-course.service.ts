import type { GetCourseSchema } from "@repo/schemas/course/get.course";
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

	return response(200, course ? courseDto(course) : null);
}

export { getCourseService };
