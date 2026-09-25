import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import type { BatchBaseSchema } from "@repo/schemas/batch/base.batch";
import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";

import { batchesMutations, batchesQueries } from "@/queries/batches";
import { BatchForm } from "./BatchForm";

type EditBatchFormProps = {
	id: BatchBaseSchema["id"];
};

function EditBatchForm({ id }: EditBatchFormProps) {
	const { data } = useSuspenseQuery(batchesQueries.detail(id));

	const [defaultBatch, setDefaultBatch] = useState(data);

	const { mutateAsync } = useMutation(batchesMutations.update);

	function onSuccess(newBatch: BatchBaseSchema) {
		toast.success("Batch Updated Successfully");
		setDefaultBatch(newBatch);
	}

	return (
		<BatchForm
			defaultValues={{
				...defaultBatch,
				startDate: defaultBatch.startDate.toISOString().slice(0, 10),
				endDate: defaultBatch.endDate.toISOString().slice(0, 10),
			}}
			onSubmit={async (data, setError) => {
				await mutateAsync(
					{ body: data, params: { id } },
					{
						onSuccess,
						onError: (error) => applyBackendErrors(error, setError),
					},
				);
			}}
		/>
	);
}

export { EditBatchForm };
