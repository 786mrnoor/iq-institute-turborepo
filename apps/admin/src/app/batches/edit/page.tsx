import { Suspense } from "react";
import { useParams } from "react-router";

import { batchBaseSchema } from "@repo/schemas/batch/base.batch";
import { ErrorScreen } from "@repo/ui/error-screen";
import { Heading } from "@repo/ui/heading";
import { SkeletonForm } from "@repo/ui/skeleton";

import { EditBatchForm } from "@/forms/batch/EditBatchForm";
import { NotFound } from "../NotFound";

function EditBatchPage() {
	const { id } = useParams();

	const parsed = batchBaseSchema.shape.id.safeParse(id);

	if (!parsed.success) {
		return <NotFound />;
	}

	return (
		<main className="mx-auto my-10 w-9/10 max-w-200 rounded-2xl border border-gray-300 bg-white p-2.5 md:p-5 dark:bg-neutral-800 dark:border-neutral-700">
			<Heading className="mb-3">Batch Form</Heading>

			<ErrorScreen title="Error Loading Batch">
				<Suspense fallback={<SkeletonForm />}>
					<EditBatchForm id={parsed.data} />
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { EditBatchPage };
