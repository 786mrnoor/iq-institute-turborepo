import {
	getCoursesApi,
	getCourseWithTopicsApi,
} from "@repo/api-client/courses.ts";
import { courseBaseSchema } from "@repo/schemas/course/base.course";
import { notFound } from "next/navigation";
import { CourseCard } from "./components/CourseCard";

export async function generateStaticParams() {
	const courses = await getCoursesApi("http://localhost:5000");

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
		"http://localhost:5000",
	);
	if (!course) return notFound();

	return <CourseCard course={course} />;
}

export default CoursePage;
