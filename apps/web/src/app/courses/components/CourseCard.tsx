"use client";

import { useRouter } from "next/navigation";

import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { Button, ButtonGroup } from "@repo/ui/button";

type CourseCardProps = {
	course: CourseBaseSchema;
};

export default function CourseCard({ course }: CourseCardProps) {
	const router = useRouter();
	const searchParams = new URLSearchParams({ course: course.title });

	return (
		<div className="space-y-4 rounded-lg border border-gray-300 bg-white p-5 shadow-sm hover:bg-gray-300">
			<h2 className="text-xl font-bold">{course.title}</h2>

			<div className="space-y-0.5 text-sm text-gray-900">
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
			</div>

			<ButtonGroup>
				<Button
					color="success"
					size="small"
					onClick={() => router.push(`/courses/${course.id}`)}
				>
					View
				</Button>
				<Button
					size="small"
					onClick={() => router.push(`/contact-us?${searchParams.toString()}`)}
				>
					Enroll Now
				</Button>
			</ButtonGroup>
		</div>
	);
}
