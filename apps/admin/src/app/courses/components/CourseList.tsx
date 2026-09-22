import { useSuspenseQuery } from "@tanstack/react-query";

import { coursesQueries } from "@/queries/courses";
import { CourseCard } from "./CourseCard";

function CourseList() {
	const { data: courses } = useSuspenseQuery(coursesQueries.all);

	if (courses?.length === 0)
		return <p className="text-center text-lg">No Courses Found</p>;

	return (
		<ul className="space-y-3">
			{courses?.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</ul>
	);
}

export { CourseList };
