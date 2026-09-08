import { studentBaseSchema } from "@repo/schemas/students/base.student";
import { ErrorScreen } from "@repo/ui/error-screen";
import { Heading } from "@repo/ui/heading";
import { QueryLoader } from "@repo/ui/query-loder";
import { Suspense } from "react";
import { useParams } from "react-router";
import { EditStudentForm } from "@/forms/student/EditStudentForm";
import { NotFound } from "../NotFound";

function EditStudentPage() {
	const { id } = useParams();

	const parsed = studentBaseSchema.shape.id.safeParse(id);

	if (!parsed.success) {
		return <NotFound />;
	}

	// if (isError) return <ErrorScreen error={error} title="Error Loading Student" reset={refetch} />;
	// if (isLoading) return <Loader>Loading ...</Loader>;

	// if (!student) return <p className="text-center text-lg">No Student Found</p>;

	return (
		<main className="mx-auto my-10 w-9/10 max-w-200 rounded-2xl border border-gray-300 bg-white p-2.5 md:p-5">
			<Heading className="mb-3">Update the student</Heading>

			<ErrorScreen title="Error Loading Student">
				<Suspense fallback={<QueryLoader>Student Loading...</QueryLoader>}>
					<EditStudentForm id={parsed.data} />
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { EditStudentPage };
