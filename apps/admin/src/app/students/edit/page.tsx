import { Suspense } from "react";
import { useParams } from "react-router";

import { studentBaseSchema } from "@repo/schemas/students/base.student";
import { ErrorScreen } from "@repo/ui/error-screen";
import { Heading } from "@repo/ui/heading";
import { SkeletonForm } from "@repo/ui/skeleton";

import { EditStudentForm } from "@/forms/student/EditStudentForm";
import { NotFound } from "../NotFound";

function EditStudentPage() {
	const { id } = useParams();

	const parsed = studentBaseSchema.shape.id.safeParse(id);

	if (!parsed.success) {
		return <NotFound />;
	}

	return (
		<main className="mx-auto my-10 w-9/10 max-w-200 rounded-2xl border border-gray-300 bg-white p-2.5 md:p-5 dark:bg-neutral-800 dark:border-neutral-700">
			<Heading className="mb-3">Student Form</Heading>

			<ErrorScreen title="Error Loading Student">
				<Suspense fallback={<SkeletonForm />}>
					<EditStudentForm id={parsed.data} />
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { EditStudentPage };
