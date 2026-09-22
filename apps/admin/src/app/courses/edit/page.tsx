import { Suspense } from "react";
import { useParams } from "react-router";

import { courseBaseSchema } from "@repo/schemas/course/base.course";
import { ErrorScreen } from "@repo/ui/error-screen";
import { QueryLoader } from "@repo/ui/query-loder";

import { EditCourseForm } from "@/forms/course/EditCourseForm";
import { NotFound } from "../NotFound";

function EditCoursePage() {
	const { id } = useParams();

	const parsed = courseBaseSchema.shape.id.safeParse(id);

	if (!parsed.success) {
		return <NotFound />;
	}

	return (
		<main className="mx-auto my-10 w-9/10 max-w-200 rounded-2xl border border-gray-300 bg-white p-2.5 md:p-5 dark:bg-neutral-800 dark:border-neutral-700">
			<ErrorScreen title="Error Loading Course">
				<Suspense fallback={<QueryLoader>Loading Course...</QueryLoader>}>
					<EditCourseForm id={parsed.data} />
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { EditCoursePage };
