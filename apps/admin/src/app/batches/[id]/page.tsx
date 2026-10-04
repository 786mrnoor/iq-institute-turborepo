import { Suspense } from "react";
import { useParams } from "react-router";

import { batchBaseSchema } from "@repo/schemas/batch/base.batch";
import { ErrorScreen } from "@repo/ui/error-screen";
import { SkeletonCard } from "@repo/ui/skeleton";

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
			<Suspense fallback={<SkeletonCard />}>
				<Batch id={parsed.data} />
			</Suspense>
		</ErrorScreen>
	);
}

export { BatchPage };
