import { useSuspenseQuery } from "@tanstack/react-query";

import type { CourseBaseSchema } from "@repo/schemas/course/base.course";

import { coursesQueries } from "@/queries/courses";

type CourseDetailsProps = {
	id: CourseBaseSchema["id"];
};
function CourseDetails({ id }: CourseDetailsProps) {
	const { data: course } = useSuspenseQuery(coursesQueries.detail(id));

	return (
		<p>
			<strong>Course: </strong>
			{course.title}
		</p>
	);
}

export { CourseDetails };
