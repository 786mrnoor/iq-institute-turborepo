import { response } from "@/lib/controller";
import { Course } from "@/models/course.model";
import { courseDto } from "@/utils/dtos/courseDto";

async function getCoursesService() {
	const topics = await Course.find({ deletedAt: null }).lean().exec();

	return response(
		200,
		topics.map((t) => courseDto(t)),
	);
}

export { getCoursesService };
