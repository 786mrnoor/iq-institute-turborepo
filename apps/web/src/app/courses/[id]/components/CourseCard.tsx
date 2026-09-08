"use client";

import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

type CourseProps = {
	course: Omit<CourseBaseSchema, "topics"> & { topics: TopicBaseSchema[] };
};

function CourseCard({ course }: CourseProps) {
	const router = useRouter();
	const searchParams = new URLSearchParams({ course: course.title });

	return (
		<main className="mx-auto my-5 w-9/10 max-w-250 space-y-5 rounded-xl border border-gray-300 p-10 shadow-xl">
			<h1 className="text-center text-2xl font-bold">{course.title}</h1>

			<div className="space-y-2 text-gray-900">
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
			</div>

			<Button
				onClick={() => router.push(`/contact-us?${searchParams.toString()}`)}
			>
				Enroll Now
			</Button>

			<div>
				<h2 className="text-xl font-semibold text-primary">Course Content</h2>
				<ul className="ms-5 list-disc">
					{course.topics.map((t) => (
						<li key={t.id}>{t.title}</li>
					))}
				</ul>
			</div>
		</main>
	);
}

export { CourseCard };
