import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { ErrorScreen } from "@repo/ui/error-screen";
import { QueryLoader } from "@repo/ui/query-loder";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { coursesQueries } from "@/queries/courses";
import { CourseContent } from "./CourseContent";

type CourseProps = {
	id: CourseBaseSchema["id"];
};

function Course({ id }: CourseProps) {
	const { data: course } = useSuspenseQuery(coursesQueries.detail(id));

	return (
		<main className="mx-3 my-5 mb-20 space-y-3 rounded-lg border border-gray-300 p-3 md:px-10 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
			<h1 className="mb-10 text-center text-2xl font-semibold dark:text-neutral-200">
				{course.title}
			</h1>

			<p>
				<strong>Duration: </strong>
				{course.duration.value}
				{course.duration.unit}
				{course.duration.value > 1 && "s"}
			</p>
			<p>
				<strong>Eligibility: </strong>
				{course.eligibility}
			</p>
			<p>{course.description}</p>

			<h2 className="text-xl font-semibold text-primary">Course Content</h2>

			<ErrorScreen title="Error Loading Topics">
				<Suspense fallback={<QueryLoader>Loading topics...</QueryLoader>}>
					<CourseContent topicsIds={course.topics} />
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { Course };
