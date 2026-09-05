import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";
import { ConfirmModal } from "@repo/ui/modals/confirm";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { topicsMutations } from "@/queries/topics";

type DeleteTopicModalProps = {
	id: TopicBaseSchema["id"];
	onCancel: () => void;
};

function DeleteTopicModal({ id, onCancel }: DeleteTopicModalProps) {
	const { mutate, isPending } = useMutation(topicsMutations.delete);

	return (
		<ConfirmModal
			title="Delete Topic"
			message="Are you sure you want to delete this topic?"
			confirmText="Delete"
			onCancel={onCancel}
			onConfirm={() =>
				mutate(id, {
					onSuccess: () => toast.success("Topic Deleted Successfully"),
					onError: (error) => toast.error(error.message),
					onSettled: () => onCancel(),
				})
			}
			isPending={isPending}
		/>
	);
}

export { DeleteTopicModal };
