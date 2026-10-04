import { Suspense } from "react";
import { useParams } from "react-router";

import { teacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { ErrorScreen } from "@repo/ui/error-screen";
import { Heading } from "@repo/ui/heading";
import { QueryLoader } from "@repo/ui/query-loder";

import { EditTeacherForm } from "@/forms/teacher/EditTeacherForm";
import { NotFound } from "../NotFound";

function EditTeacherPage() {
	const { id } = useParams();

	const parsed = teacherBaseSchema.shape.id.safeParse(id);

	if (!parsed.success) {
		return <NotFound />;
	}

	return (
		<main className="mx-auto my-10 w-9/10 max-w-200 rounded-2xl border border-gray-300 bg-white p-2.5 md:p-5 dark:bg-neutral-800 dark:border-neutral-700">
			<Heading className="mb-3">Teacher Form</Heading>

			<ErrorScreen title="Error Loading Teacher">
				<Suspense fallback={<QueryLoader>Teacher Loading...</QueryLoader>}>
					<EditTeacherForm id={parsed.data} />
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { EditTeacherPage };
