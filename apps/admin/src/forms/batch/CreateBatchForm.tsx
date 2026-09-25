import { useMutation } from "@tanstack/react-query";
import { Suspense } from "react";
import toast from "react-hot-toast";

import { ErrorScreen } from "@repo/ui/error-screen";
import { QueryLoader } from "@repo/ui/query-loder";
import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";

import { batchesMutations } from "@/queries/batches";
import { BatchForm } from "./BatchForm";
import type { BatchFormInput } from "./batch.schema";

const DEFAULT_VALUES: BatchFormInput = {
	courseId: "",
	name: "",
	code: "",
	startDate: "",
	endDate: "",
	capacity: "",
	schedule: {
		startTime: "",
		endTime: "",
	},
	status: "upcoming",
};

function CreateBatchForm() {
	const { mutateAsync } = useMutation(batchesMutations.add);

	return (
		<ErrorScreen>
			<Suspense fallback={<QueryLoader />}>
				<BatchForm
					defaultValues={DEFAULT_VALUES}
					onSubmit={(data, setError) =>
						mutateAsync(data, {
							onSuccess: () => toast.success("Batch Added Successfully"),
							onError: (error) => applyBackendErrors(error, setError),
						})
					}
				/>
			</Suspense>
		</ErrorScreen>
	);
}

export { CreateBatchForm };
