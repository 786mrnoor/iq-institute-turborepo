import { CreateCourseForm } from "@/forms/course/CreateCourseForm";

function CreateCoursePage() {
	return (
		<main className="mx-auto my-10 w-9/10 max-w-200 rounded-2xl border border-gray-300 bg-white p-2.5 md:p-5">
			<CreateCourseForm />
		</main>
	);
}

export { CreateCoursePage };
