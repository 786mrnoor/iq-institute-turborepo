import { Suspense } from "react";
import { useParams } from "react-router";

import { batchBaseSchema } from "@repo/schemas/batch/base.batch";
import { ErrorScreen } from "@repo/ui/error-screen";
import { QueryLoader } from "@repo/ui/query-loder";

import { NotFound } from "../NotFound";
import { Batch } from "./Batch";

function BatchPage() {
	const { id } = useParams();

	const parsed = batchBaseSchema.shape.id.safeParse(id);

	if (!parsed.success) {
		return <NotFound />;
	}

	return (
		<ErrorScreen title="Error Loading Course">
			<Suspense fallback={<QueryLoader>Loading Batches...</QueryLoader>}>
				<Batch id={parsed.data} />
			</Suspense>
		</ErrorScreen>
	);
}

export { BatchPage };
