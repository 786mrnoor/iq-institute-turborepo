import { useSuspenseQuery } from "@tanstack/react-query";

import { batchesQueries } from "@/queries/batches";
import { BatchCard } from "./BatchCard";

function BatchList() {
	const {
		data: { batches },
	} = useSuspenseQuery(batchesQueries.list);

	if (batches?.length === 0)
		return <p className="text-center text-lg">No Batches Found</p>;

	return (
		<ul className="space-y-3">
			{batches?.map((batch) => (
				<BatchCard key={batch.id} batch={batch} />
			))}
		</ul>
	);
}

export { BatchList };
