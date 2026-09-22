import { getCoursesApi } from "@repo/api-client/courses.ts";

import CourseCard from "./CourseCard";

async function Courses() {
	const courses = await getCoursesApi(process.env.NEXT_BACKEND_URL);

	return (
		<section className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-5">
			{courses.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</section>
	);
}

export { Courses };
