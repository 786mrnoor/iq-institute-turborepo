import type { CourseBaseSchema } from "@repo/schemas/course/base.course";

async function revalidateCourse(courseIds: CourseBaseSchema["id"][]) {
	const data = courseIds.map((id) => `/courses/${id}`);

	await fetch(`${process.env.BACKEND_NEXT_APP_URL}/api/revalidate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-revalidate-secret": process.env.BACKEND_REVALIDATION_SECRET!,
		},
		body: JSON.stringify(data),
	});
}

export { revalidateCourse };
