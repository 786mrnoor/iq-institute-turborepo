import type { GetCourseSchema } from "@repo/schemas/course/get.course";
import { AppError } from "@repo/utils/app-error.js";
import { response } from "@/lib/controller";
import type { PublicControllerContext } from "@/lib/controller/types";
import { Course } from "@/models/course.model";
import { Topic, type TTopic } from "@/models/topic.model";
import { courseDto } from "@/utils/dtos/courseDto";
import { topicDto } from "@/utils/dtos/topicDto";

async function getCourseService({
	input,
}: PublicControllerContext<GetCourseSchema>) {
	const course = await Course.findOne({ _id: input.params.id, deletedAt: null })
		.lean()
		.exec();

	if (!course) {
		throw new AppError(404, "Course Not Found");
	}

	const courseRes = courseDto(course);

	let topics: TTopic[] | null = null;

	if (input.query.include) {
		topics = await Topic.find({ _id: courseRes.topics, deletedAt: null })
			.lean()
			.exec();
	}

	const res = {
		...courseRes,
		topics: topics ? topics.map(topicDto) : course.topics,
	};

	return response(200, res);
}

export { getCourseService };
