import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { topicsQueries } from "@/queries/topics";

type CourseContentProps = {
	topicsIds: CourseBaseSchema["topics"];
};

function CourseContent({ topicsIds }: CourseContentProps) {
	const { data } = useSuspenseQuery(topicsQueries.all);

	const topics = useMemo(() => {
		return data.filter((t) => topicsIds.includes(t.id));
	}, [data, topicsIds]);

	return (
		<ul className="ms-5 list-disc">
			{topics.map((topic) => (
				<li key={topic.id}>{topic.title}</li>
			))}
		</ul>
	);
}

export { CourseContent };
