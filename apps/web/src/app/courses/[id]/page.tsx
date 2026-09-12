import {
	getCoursesApi,
	getCourseWithTopicsApi,
} from "@repo/api-client/courses.ts";
import { courseBaseSchema } from "@repo/schemas/course/base.course";
import { notFound } from "next/navigation";
import { CourseCard } from "./components/CourseCard";

export async function generateStaticParams() {
	const courses = await getCoursesApi(process.env.NEXT_BACKEND_URL);

	return courses.map((course) => ({
		id: course.id,
	}));
}

async function CoursePage({ params }: PageProps<"/courses/[id]">) {
	const { id } = await params;

	const parsed = courseBaseSchema.shape.id.safeParse(id);
	if (parsed.error) return notFound();

	const course = await getCourseWithTopicsApi(
		parsed.data,
		process.env.NEXT_BACKEND_URL || "",
	);
	if (!course) return notFound();

	return <CourseCard course={course} />;
}

export default CoursePage;
