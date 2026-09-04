import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";
import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { topicsMutations, topicsQueries } from "@/queries/topics";
import { TopicForm } from "./TopicForm";

type EditTopicFormProps = {
	editId: TopicBaseSchema["id"];
	onUpdated: () => void;
};

function EditTopicForm({ editId, onUpdated }: EditTopicFormProps) {
	const { mutateAsync } = useMutation(topicsMutations.update);

	const { data: topics } = useSuspenseQuery(topicsQueries.all);

	function onSuccess() {
		toast.success("Topic Updated Successfully");
		onUpdated();
	}

	return (
		<TopicForm
			defaultValues={{
				title: topics?.find((t) => t.id === editId)?.title || "",
			}}
			onSubmit={async (data, setError) => {
				await mutateAsync(
					{ params: { id: editId }, body: data },
					{
						onSuccess,
						onError: (error) => applyBackendErrors(error, setError),
					},
				);
			}}
		/>
	);
}

export { EditTopicForm };
