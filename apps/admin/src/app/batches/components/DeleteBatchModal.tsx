import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { BatchBaseSchema } from "@repo/schemas/batch/base.batch";
import { ConfirmModal } from "@repo/ui/modals/confirm";

import { batchesMutations } from "@/queries/batches";

type DeleteBatchModalProps = {
	id: BatchBaseSchema["id"];
	onCancel: () => void;
};

function DeleteBatchModal({ id, onCancel }: DeleteBatchModalProps) {
	const { mutate, isPending } = useMutation(batchesMutations.delete);

	return (
		<ConfirmModal
			title="Delete Batch"
			message="Are you sure you want to delete this batch?"
			confirmText="Delete"
			onCancel={onCancel}
			onConfirm={() =>
				mutate(id, {
					onSuccess: () => toast.success("Batch Deleted Successfully"),
					onError: (error) => toast.error(error.message),
					onSettled: () => onCancel(),
				})
			}
			isPending={isPending}
		/>
	);
}

export { DeleteBatchModal };
