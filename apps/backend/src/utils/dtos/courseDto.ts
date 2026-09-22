import type { CourseBaseSchema } from "@repo/schemas/course/base.course";

import type { TCourse } from "@/models/course.model";

export function courseDto(doc: TCourse) {
	const { _id, __v, ...rest } = doc;

	return {
		...rest,
		id: String(_id),
		topics: doc.topics.map((t) => String(t)),
	} as CourseBaseSchema;
}
